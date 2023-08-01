/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Categories',
      [
        {
          title: 'Accounts',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Skins',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Servces ',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Items',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  },
};
