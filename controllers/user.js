'use stric'

const { compareSync } = require("bcrypt");
const { required } = require("joi");

const users = require('../models/index').users;

// Registrer
async function createUser(request, h) {
  let result
  try {
    result = await users.create({ ...request.payload })
  } catch (error) {
    console.log(error);
    return h.response('Problemas creando usuario')
  }
  return h.response(`Usuario creado ID: ${result}`)
}
// Login
async function validateUser(request, h) {
  let result
  try {
    result = await users.validateUser({ ...request.payload })
    if(!result) {
      h.response('Email y/o contraseña incorrecta').code(401)
    }
  } catch (error) {
    console.log(error);
    return h.response('Problemas validando usuario')
  }
  return h.redirect('/').state('user', {
    name: result.name,
    email: result.email
  })
}

function logout(reques, h) {
  return h.redirect('/login').unstate('user')
}

module.exports = {
  createUser,
  validateUser,
  logout
}