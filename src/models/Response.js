import Sequelize, { Model } from 'sequelize';

export default class Invite extends Model {
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
  }

  static associate(models) {
    this.belongsTo(models.Invite);
  }
}