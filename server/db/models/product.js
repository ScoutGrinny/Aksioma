const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({
      Lot, Game, Category, Basket,
    }) {
      this.hasMany(Lot, { foreignKey: 'ProductId' });
      this.belongsTo(Game, { foreignKey: 'GameId' });
      this.belongsTo(Category, { foreignKey: 'CategoryId' });
      this.hasMany(Basket, { foreignKey: 'UserId' });
    }
  }
  Product.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    GameId: DataTypes.INTEGER,
    CategoryId: DataTypes.INTEGER,
    image: DataTypes.TEXT,
    description: DataTypes.TEXT,
    approved: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};
