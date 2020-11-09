import Sequelize, { Model, Op } from 'sequelize';

import { Person, Invite } from 'src/models';

export default class Response extends Model {
  static init(sequelize) {
    super.init({
      firstName: {
        type: Sequelize.STRING,
      },
      lastName: {
        type: Sequelize.STRING,
      },
      numberAttending: {
        type: Sequelize.INTEGER,
      },
      attending: {
        type: Sequelize.BOOLEAN,
      },
    }, {
      sequelize,
      modelName: 'response',
    });

    this.addHook('afterCreate', async (model) => {
      const { firstName, lastName, numberAttending, attending } = model;
      const person = await Person.findOne({
        where: {
          firstName: {
            [Op.iLike]: `${firstName}`
          },
          lastName: {
            [Op.iLike]: `${lastName}`
          },
          inviteId: {
            [Op.ne]: null,
          },
        }
      });

      if (person) {
        const invite = await person.getInvite();

        if (invite) {
          invite.sizeOfParty = numberAttending;
          invite.status = attending ? 'Accepted' : 'Rejected';
          invite.viewed = true;
          invite.sent = true;

          await invite.save();

          model.inviteId = invite.id;

          await model.save();
        }
      } else {
        const invite = await Invite.create({
          sizeOfParty: numberAttending,
          status: attending ? 'Accepted' : 'Rejected',
          viewed: true,
          sent: true,
        });

        await Person.create({ firstName, lastName, inviteId: invite.id });

        model.inviteId = invite.id;

        await model.save();
      }
    });
  }

  static associate(models) {
    this.belongsTo(models.Invite);
  }
}