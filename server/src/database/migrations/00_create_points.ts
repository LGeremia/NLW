import Knex from 'knex';

// Cria a tabela
export async function up(knex: Knex){
    return knex.schema.createTable('points', table => {
        table.increments('id').primary();
        table.string('image').notNullable();
        table.string('name').notNullable();
        table.string('whatsapp').notNullable();
        table.string('email').notNullable();
        table.string('city').notNullable();
        table.string('uf', 2).notNullable();
        table.decimal("latitude").notNullable();
        table.decimal("longitude").notNullable();
    });
}

// Deleta a tabela
export async function down(knex: Knex){
    return knex.schema.dropTable('points');
}