'use stric'

function home(request, h) {
  return h.view('index', {
    title: 'home'
  })
}

function register(request, h) {
  return h.view('register', {
    title: 'registro'
  })
}

module.exports = {
  home,
  register
}