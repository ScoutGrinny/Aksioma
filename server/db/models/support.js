const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Support extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      this.belongsTo(User);
      // define association here
    }
  }
  Support.init({
    question: DataTypes.TEXT,
    answer: DataTypes.TEXT,
    status: DataTypes.BOOLEAN,
    UserId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Support',
  });
  return Support;
};
