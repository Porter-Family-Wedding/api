import Sequelize, { Model } from 'sequelize';

export default class Group extends Model {
  static init(sequelize) {
    return super.init({
      enumeratedName: {
        type: Sequelize.TEXT,
        unique: true,
        allowNull: false,
      },
      displayName: {
        type: Sequelize.TEXT,
      },
      permissions: {
        type: Sequelize.JSONB,
      },
    }, {
      sequelize,
      modelName: 'groups',
      indexes: [
        {
          unique: true,
          fields: ['enumerated_name'],
        },
      ],
    });
  }

  static associate(models) {
    this.belongsToMany(models.Person, { through: models.GroupMembership });
  }
}