exports.up = async function (knex) {
    await knex.schema.createTable('users', (table) => {
      table.increments('id').primary();
      table.string('username').notNullable().unique();
      table.string('password').notNullable();
      table.enu('role', ['admin', 'manager', 'user']).notNullable();
    });
  };
  
  exports.down = async function (knex) {
    await knex.schema.dropTable('users');
  };
  