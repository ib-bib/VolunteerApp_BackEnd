import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import EnumValues from 'App/Enums/EnumValues'

export default class extends BaseSchema {
  protected tableName = 'admins'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('email', 255).notNullable().unique()
      table.string('password', 180).notNullable()
      table.string('name').notNullable()
      table.string('phone').notNullable()
      table.enum('team',EnumValues.Teams).nullable()
      table.integer('yellow_flags').defaultTo(0)
      table.integer('red_flags').defaultTo(0)
      table.string('branch_join_date').nullable()
      table.integer('tasks_completed').defaultTo(0)
      table.boolean('is_leader').defaultTo(false)
      table.boolean('is_deleted').defaultTo(false)
      table.boolean('is_suspended').defaultTo(false)
      table.boolean('is_verified').defaultTo(false)


      table.string('remember_me_token').nullable()

      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
