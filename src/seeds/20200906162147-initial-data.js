'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('groups', [
      {
        enumerated_name: 'DEFAULT',
        display_name: 'Everyone',
        permissions: JSON.stringify({
          invites: ['read', 'answer'],
          people: ['read', 'suggest', 'answer'],
        }),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        enumerated_name: 'ADMINS',
        display_name: 'Admins',
        permissions: JSON.stringify({
          addresses: ['*'],
          groups: ['*'],
          group_memberships: ['*'],
          invites: ['*'],
          messages: ['*'],
          people: ['*'],
        }),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        enumerated_name: 'BRIDES_PARTY',
        display_name: 'Bridesmaids',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        enumerated_name: 'GROOMS_PARTY',
        display_name: 'Groomsmen',
        created_at: new Date(),
        updated_at: new Date()
      },
    ]);

    await queryInterface.bulkInsert('people', [
      {
        auth0_id: 'auth0|5f557ed89b7254006d9be82f',
        first_name: 'Kalob',
        last_name: 'Porter',
        attending: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        first_name: 'Kendra',
        last_name: 'Sipes',
        attending: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        first_name: 'Traci',
        last_name: 'Gill',
        attending: true,
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);

    await queryInterface.bulkInsert('group_memberships', [
      {
        person_id: 1,
        group_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        person_id: 1,
        group_id: 2,
        role: 'Super Admin',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        person_id: 1,
        group_id: 4,
        role: 'Groom',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        person_id: 2,
        group_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        person_id: 2,
        group_id: 2,
        role: 'Super Admin',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        person_id: 2,
        group_id: 3,
        role: 'Bride',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        person_id: 3,
        group_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        person_id: 3,
        group_id: 2,
        role: 'Super Admin',
        created_at: new Date(),
        updated_at: new Date()
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('groups');
    await queryInterface.bulkDelete('people');
  }
};
