/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Games',
      [
        {
          title: 'Cs:go',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'WOW',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Dota',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Games', null, {});
  },
};
