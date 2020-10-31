import Sequelize, { Model } from 'sequelize';

import codeGenerator from 'src/helpers/codeGenerator';
import { Address } from 'src/models';

export default class Invite extends Model {
  static init(sequelize) {
    super.init({
      viewed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      sent: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      status: {
        type: Sequelize.ENUM('Accepted', 'Rejected'),
      },
      assumedSizeOfParty: {
        type: Sequelize.INTEGER,
      },
      sizeOfParty: {
        type: Sequelize.INTEGER,
      },
      notes: {
        type: Sequelize.STRING,
      },
    }, {
      sequelize,
      modelName: 'invites',
    });

    this.addHook('beforeCreate', async (model) => {
      const address = await Address.create();

      model.addressId = address.id;
    });
  }

  static associate(models) {
    this.belongsTo(models.Address);

    this.hasMany(models.Person);
  }
}