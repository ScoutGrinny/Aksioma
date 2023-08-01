const { sequelize } = require('../db/models');

module.exports = async function dbCheck() {
  try {
    await sequelize.authenticate();
    console.log('Database is online!');
  } catch (error) {
    console.log('Something wrong with database!');
  }
};
