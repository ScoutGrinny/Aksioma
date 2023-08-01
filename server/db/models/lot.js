const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Lot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Product }) {
      this.belongsTo(User, { foreignKey: 'UserId' });
      this.belongsTo(Product, { foreignKey: 'ProductId' });
    }
  }
  Lot.init({
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Lot',
  });
  return Lot;
};
