const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      this.belongsTo(User, { foreignKey: 'UserId' });
    }
  }
  History.init({
    UserId: DataTypes.INTEGER,
    purchase: DataTypes.TEXT,
    sales: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'History',
  });
  return History;
};
