'use stric'

const { server } = require("@hapi/hapi")

function home(request, h) {
  return h.view('index', {
    title: 'home',
    user: request.state.user
  })
}

function register(request, h) {
  return h.view('register', {
    title: 'registro',
    user: request.state.user
  })
}

function login(request, h) {
  return h.view('login', {
    title: 'Ingrese',
    user: request.state
  })
}

module.exports = {
  home,
  register,
  login
}