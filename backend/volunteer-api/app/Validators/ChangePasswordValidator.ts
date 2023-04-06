import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateUserValidator {
    constructor(protected ctx: HttpContextContract) { }
    public schema = schema.create({
        email: schema.string([
            rules.email(),
        ]),
        password: schema.string({}),
        new_password: schema.string([rules.minLength(8)]),
    })
    public messages: CustomMessages = {}
}