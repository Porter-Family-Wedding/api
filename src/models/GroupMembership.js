import Sequelize, { Model } from 'sequelize';

export default class GroupMembership extends Model {
  static init(sequelize) {
    return super.init({
      role: {
        type: Sequelize.TEXT,
      },
    }, {
      sequelize,
      modelName: 'group_memberships',
    });
  }

  static associate(models) {
    this.hasMany(models.Person);
  }
}