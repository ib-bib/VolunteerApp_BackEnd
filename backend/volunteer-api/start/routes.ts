/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

Route.get('/', async (ctx: HttpContextContract) => {
  if (ctx.auth.use('admin').isLoggedIn) {
    return `Logged In as admin ${ctx.auth.use('admin').user?.name}`
  }
  if (ctx.auth.use('user').isLoggedIn) {
    return `Logged In as user ${ctx.auth.use('user').user?.name}` 
  }
  return 'HOME : Not Logged in'
})


Route.group(() => {
  Route.post('/register_user', 'UserAuthsController.register')
  Route.post('/register_admin', 'AdminAuthsController.register')
  Route.post('/user_login', 'UserAuthsController.login')
  Route.post('/admin_login', 'AdminAuthsController.login')
  Route.post('/user_logout', 'UserAuthsController.logout')
  Route.post('/admin_logout', 'AdminAuthsController.logout')

}).prefix('auth');

