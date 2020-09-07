import Sequelize, { Model } from 'sequelize';

export default class Message extends Model {
  static init(sequelize) {
    return super.init({
      message: {
        type: Sequelize.TEXT,
      }
    }, {
      sequelize,
      modelName: 'messages',
    });
  }

  static associate(models) {
    this.hasMany(models.Person);
  }
}