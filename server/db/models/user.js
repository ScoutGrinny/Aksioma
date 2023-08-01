const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({
      Lot, History, Support, Basket,
    }) {
      this.hasMany(Lot, { foreignKey: 'UserId' });
      this.hasMany(Support, { foreignKey: 'UserId' });
      this.hasMany(History, { foreignKey: 'UserId' });
      this.hasMany(Basket, { foreignKey: 'UserId' });
    }
  }
  User.init({
    login: DataTypes.TEXT,
    email: DataTypes.TEXT,
    password: DataTypes.TEXT,
    image: DataTypes.TEXT,
    isAdmin: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
