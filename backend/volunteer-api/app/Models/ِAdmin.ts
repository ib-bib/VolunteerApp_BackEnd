import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel } from '@ioc:Adonis/Lucid/Orm'

export default class Admin extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column()
  public name: string

  @column()
  public phone: string

  @column()
  public team: string

  @column()
  public yellow_flags: number
  // Delete

  @column()
  public red_flags: number
  // Delete

  @column()
  public branch_join_date: string

  @column()
  public tasks_completed: number

  @column({
    serialize(value: number) {
      return Boolean(value)
    },
  })
  public is_leader: Boolean

  @column({
    serialize(value: number) {
      return Boolean(value)
    },
  })
  public is_deleted: Boolean

  @column({
    serialize(value: number) {
      return Boolean(value)
    },
  })
  public is_suspended: Boolean

  @column({
    serialize(value: number) {
      return Boolean(value)
    },
  })
  public is_verified: Boolean
  // Delete

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(admin: Admin) {
    if (admin.$dirty.password) {
      admin.password = await Hash.make(admin.password)
    }
  }
}
