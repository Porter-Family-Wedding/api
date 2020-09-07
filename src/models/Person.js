import Sequelize, { Model } from 'sequelize';

export default class Person extends Model {
  static init(sequelize) {
    return super.init({
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
  }

  static associate(models) {
    this.belongsTo(models.Invite);

    this.belongsToMany(models.Group, { through: models.GroupMembership });
  }
}