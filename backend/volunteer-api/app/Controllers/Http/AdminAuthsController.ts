import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Admin from 'App/Models/ِAdmin';
import CreateAdminValidator from 'App/Validators/CreateAdminValidator'
import LoginValidator from 'App/Validators/LoginValidator';


export default class AdminAuthsController {
    public async register(ctx: HttpContextContract) {
        const data = await ctx.request.validate(CreateAdminValidator);

        const admin = await Admin.create(data);

        await admin.save();

        return ctx.response.json({
            msg: "Ok"
        })
    }

    public async login(ctx: HttpContextContract) {
        const data = await ctx.request.validate(LoginValidator);

        await ctx.auth.use('admin').attempt(data.email, data.password)

        console.log('Successfully Logged in ' + ctx.auth.use('admin').isLoggedIn);

        return ctx.response.redirect('/');
    }

    public async logout({auth, response}: HttpContextContract) {
        await auth.use('admin').logout();
        return response.redirect('/');
    }

}
