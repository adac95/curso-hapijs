'use strict'
const Joi = require('joi');
const site = require('./controllers/site');
const user = require('./controllers/user');

module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: site.home
  },
//  pagina de formulario para registrar
  {
    method: 'GET',
    path: '/register',
    handler: site.register
  },
  // pagina de login
  {
    method: 'GET',
    path: '/login',
    handler: site.login
  },
  // pagina de logout
  {
    method: 'GET',
    path: '/logout',
    handler: user.logout
  },
  {
    method: 'POST',
    path: '/create-user',
    options: {
      validate: {
        payload: Joi.object({
          name: Joi.string().min(3).max(30).required(),
          email: Joi.string().email().required(),
          password: Joi.string().min(6).required()
        })
      }
    },
    handler: user.createUser
  },
  // Registro del Login
  {
    method: 'POST',
    path: '/validate-user',
    options: {
      validate: {
        payload: Joi.object({
          email: Joi.string().email().required(),
          password: Joi.string().min(6).required()
        })
      }
    },
    handler: user.validateUser
  },
  {
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: '.',
        redirectToSlash: true,
        index: true,
      }
    }
  }
]
