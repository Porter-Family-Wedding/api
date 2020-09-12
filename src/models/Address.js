import Sequelize, { Model } from 'sequelize';

export default class Account extends Model {
  static init(sequelize) {
    return super.init({
      street: {
        type: Sequelize.STRING,
      },
      suite: {
        type: Sequelize.STRING,
      },
      city: {
        type: Sequelize.STRING,
      },
      state: {
        type: Sequelize.STRING,
      },
      zipCode: {
        type: Sequelize.INTEGER,
      },
      to: {
        type: Sequelize.STRING,
      },
    }, {
      sequelize,
      modelName: 'addresses',
    });
  }

  static associate(models) {
    this.hasMany(models.Person);
  }
}