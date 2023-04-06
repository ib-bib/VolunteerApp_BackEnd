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
    return {
      message: `Logged In as admin ${ctx.auth.use('admin').user?.name}`,
      data: ctx.auth.use('admin').user,
      team: {
        // All team members data goes here
      }
    };
    // return all the relevant data for all the members of the team that the HR member manages
    // If the request is done by the leader of the HR, the data they see is every admin that is not a leader
  }
  if (ctx.auth.use('user').isLoggedIn) {
    return {
      message: `Logged In as user ${ctx.auth.use('user').user?.name}`,
      data: {
        name: ctx.auth.use('user').user?.name,
        team: ctx.auth.use('user').user?.team,
        yellow_flags: ctx.auth.use('user').user?.yellow_flags,
        red_flags: ctx.auth.use('user').user?.red_flags,
        year_joined: ctx.auth.use('user').user?.branch_join_date.substring(0, 4),
        major_tasks: ctx.auth.use('user').user?.tasks_completed,
        leadership_status: ctx.auth.use('user').user?.is_leader,
      },
    }
    // return the specific user's data: their name, their team, their flags count, their major task count, their leadership status
    // also return their ratings, and the relevant notifications (branch-wide and team-specific events/meetings)
    // BONUSES: computing an average of their rating and returning the latest rating
  }
  return 'HOME : Not Logged in'
})


Route.group(() => {
  Route.post('/user_register', 'UserAuthsController.register')
  Route.post('/admin_register', 'AdminAuthsController.register')
  // Minor alteration for consistency
  Route.post('/user_login', 'UserAuthsController.login')
  Route.post('/admin_login', 'AdminAuthsController.login')
  Route.post('/user_logout', 'UserAuthsController.logout')
  Route.post('/admin_logout', 'AdminAuthsController.logout')

}).prefix('auth');

