import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('meals', (table) => {
    table.uuid('id').primary()
    table.text('nameMeal').notNullable()
    table.text('description').notNullable()
    table.text('type').notNullable()
    table.timestamp('time').defaultTo(knex.fn.now())
    table.text('session_id').notNullable()
   })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('meals')
}

