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
  {
    method: 'GET',
    path: '/register',
    handler: site.register
  },
  {
    method: 'POST',
    options: {
      validate: {
        payload: Joi.object({
          name: Joi.string().min(3).max(30).required(),
          email: Joi.string().email().required(),
          password: Joi.string().min(6).required()
        })
      }
    },
    path: '/create-user',
    handler: user.createUser
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
