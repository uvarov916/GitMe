var Handlebars = require('handlebars');
var Path = require('path');
var Hapi = require('hapi');

// Create a server with a host and port
var server = new Hapi.Server();
server.connection({
  host: 'localhost',
  port: 3000
});

server.views({
  engines: {
    html: Handlebars.create()
  },
  path: Path.join(__dirname, 'views'),
  layoutPath: Path.join(__dirname, 'views/layout'),
  layout: true,
  partialsPath: Path.join(__dirname, 'views/partials')
});

server.route({
  method: 'GET',
  path: '/',
  handler: function(request, reply) {
    reply("Here's the main page.");
  }
});

server.route({
  method: 'GET',
  path: '/users/{username}',
  handler: function(request, reply) {
    reply("username: " + encodeURIComponent(request.params.username));
  }
});

server.route({
  method: 'GET',
  path: '/views-test',
  handler: function(request, reply) {
    reply.view('item', {title: 'Item Title', body: 'Item Body'})
  }
});

// server.route({
//   method: 'GET',
//   path: '/get-user-data/{username}',

// });

// Start the server
server.start();