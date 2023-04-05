import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';
import CreateUserValidator from 'App/Validators/CreateUserValidator';
import LoginValidator from 'App/Validators/LoginValidator';

export default class UserAuthsController {
    public async register(ctx: HttpContextContract) {
        const data = await ctx.request.validate(CreateUserValidator);

        const user = await User.create(data);

        await user.save();

        return ctx.response.json({
            msg: "Ok"
        })
    }

    public async login(ctx: HttpContextContract) {
        const data = await ctx.request.validate(LoginValidator);

        await ctx.auth.use('user').attempt(data.email, data.password)

        console.log('Successfully Logged in ' + ctx.auth.use('user').isLoggedIn);

        return ctx.response.redirect('/');
    }

    public async logout({auth, response}: HttpContextContract) {
        await auth.use('user').logout();
        return response.redirect('/');
    }
}
