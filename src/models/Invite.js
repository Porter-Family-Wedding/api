import Sequelize, { Model } from 'sequelize';

export default class Invite extends Model {
  static init(sequelize) {
    return super.init({
      code: {
        type: Sequelize.TEXT,
        unique: true,
        allowNull: false,
      },
      accepted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
  }

  static associate(models) {
    this.belongsTo(models.Address);
  }
}