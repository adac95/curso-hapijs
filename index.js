
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