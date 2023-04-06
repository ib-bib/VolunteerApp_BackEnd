import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';
import CreateUserValidator from 'App/Validators/CreateUserValidator';
import LoginValidator from 'App/Validators/LoginValidator';
import ChangePasswordValidator from 'App/Validators/ChangePasswordValidator'

export default class UserAuthsController {
    public async register(ctx: HttpContextContract) {
        const data = await ctx.request.validate(CreateUserValidator);

        const user = await User.create(data);

        await user.save();

        return ctx.response.json({
            msg: "Sign up successful"
        })
    }

    public async login(ctx: HttpContextContract) {
        const data = await ctx.request.validate(LoginValidator);

        await ctx.auth.use('user').attempt(data.email, data.password)

        console.log('Successfully Logged in ' + ctx.auth.use('user').isLoggedIn);

        return ctx.response.redirect('/');
    }

    public async logout({ auth, response }: HttpContextContract) {
        await auth.use('user').logout();
        return response.redirect('/');
    }

    public async changePassword(ctx: HttpContextContract) {
        const user = ctx.auth.use('user').user;
        if (!user) {
            return ctx.response.status(500).json({
                message: 'Sorry, an unexpected error has occurred'
            })
        }
        const newPassword = (await ctx.request.validate(ChangePasswordValidator)).new_password
        if (newPassword == user.password) {
            return ctx.response.status(400).json({
                message: 'Sorry, your new password cannot be the same as the old on'
            })
        }
        user.password = newPassword;
        await user.save()
        return ctx.response.status(200).json({
            message: 'Password changed successfully'
        })
    }
}
