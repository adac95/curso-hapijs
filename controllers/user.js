'use stric'

const { compareSync } = require("bcrypt");
const { required } = require("joi");

const users = require('../models/index').users;

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


module.exports = {
  createUser,
}