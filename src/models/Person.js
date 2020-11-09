import Sequelize, { Model } from 'sequelize';

import { GroupMembership } from 'src/models';

export default class Person extends Model {
  static init(sequelize) {
    super.init({
      auth0Id: {
        type: Sequelize.TEXT,
      },
      firstName: {
        type: Sequelize.TEXT,
      },
      lastName: {
        type: Sequelize.TEXT,
      },
      phoneNumber: {
        type: Sequelize.TEXT,
      },
      pending: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      attending: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
    }, {
      sequelize,
      modelName: 'people',
    });

    this.addHook('afterCreate', async (model) => {
      await GroupMembership.create({
        personId: model.id,
        // Add the person to the "everyone" group
        groupId: 1,
      });
    });
  }

  static associate(models) {
    this.belongsTo(models.Invite);

    this.belongsToMany(models.Group, { through: models.GroupMembership });
  }
}