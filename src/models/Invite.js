import Sequelize, { Model } from 'sequelize';

import codeGenerator from 'src/helpers/codeGenerator';
import { Address } from 'src/models';

export default class Invite extends Model {
  static init(sequelize) {
    super.init({
      code: {
        type: Sequelize.TEXT,
        unique: true,
      },
      viewed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      sent: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      notes: {
        type: Sequelize.STRING,
      },
    }, {
      sequelize,
      modelName: 'invites',
      indexes: [
        {
          unique: true,
          fields: ['code'],
        },
      ],
    });

    this.addHook('beforeCreate', async (model) => {
      const code = await codeGenerator();

      model.code = code;

      const address = await Address.create();

      model.addressId = address.id;
    });
  }

  static associate(models) {
    this.belongsTo(models.Address);

    this.hasMany(models.Person);
  }
}