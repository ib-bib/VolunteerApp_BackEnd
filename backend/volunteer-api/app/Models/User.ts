import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel } from '@ioc:Adonis/Lucid/Orm'

export default class User extends BaseModel {
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

  @column()
  public red_flags: number

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

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
