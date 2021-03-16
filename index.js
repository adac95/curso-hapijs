
'use strict'
const path = require('path');
const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const handlebars = require('handlebars');
const { ClientRequest } = require('http');

const routes = require('./routes');

const init = async () => {

  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
    routes: {
      files: {
        relativeTo: path.join(__dirname, 'public')
      }
    },
  });

  await server.register(Inert);
  await server.register(Vision);

  server.state('user', {
    ttl: 1000*60*60*24, //duracion del token (1 dia) 
    isSecure: process.env.NODE_ENV === 'prod', //propiedad para preguntar si la cookie es segura o no
    isHttpOnly: true, 
    encoding: 'base64json',
    clearInvalid: true,
    strictHeader: true
  });

  server.views({
    engines: {
      hbs: handlebars,
    },
    relativeTo: __dirname,
    path: 'views',
    layout: true,
    layoutPath: 'views'
  });

  server.route(routes)
  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

  console.log(err);
  process.exit(1);
});

init();