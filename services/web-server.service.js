const http = require('http');
const express = require('express');
const webServerConfig = require('../config/web-server.config.js');
var swaggerJSDoc = require('swagger-jsdoc');

let httpServer;

function initialize() {
  return new Promise((resolve, reject) => {
    const app = express();


    httpServer = http.createServer(app);

    var bodyParser = require('body-parser');
    //configure bodyparser
    var bodyParserJSON = bodyParser.json();
    var bodyParserURLEncoded = bodyParser.urlencoded({ extended: true });

    //initialise express router
    var router = express.Router();

    // configure app.use()
    // app.use(log);
    app.use(bodyParserJSON);
    app.use(bodyParserURLEncoded);

    // Error handling
    // app.use(function(req, res, next) {
    // res.setHeader("Access-Control-Allow-Origin", "*");
    // res.setHeader("Access-Control-Allow-Credentials", "true");
    // res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    // res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Origin,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization");
    // next();
    // });


    /**swagger configuration */
    var swaggerUi = require('swagger-ui-express');
    var swaggerDocument = require('../config/swagger.json');




    /** another configuration for wagger */
    // swagger definition
    var swaggerDefinition = {
      "swagger": "2.0",
      "info": {
        "version": "1.0.0",
        "title": "Demo application with Node JS, Routing, Swagger",
        "description": "Demo application with Node JS, Routing, Swagger",
        "author": "Satish Salokhe",
        "contact": "satys09@gmail.com",
        "license": {
          "name": "MIT",
          "url": "https://opensource.org/licenses/MIT"
        }
      },
      "host": "localhost:3000",
      "basePath": "/api/",
      "schemes": [
        "http"
      ],
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
    };

    // options for the swagger docs
    var options = {
      // import swaggerDefinitions
      swaggerDefinition: swaggerDefinition,
      // path to the API docs
      apis: ['../api/heros/heros.routes.js'],// pass all in array 
    };
    // initialize swagger-jsdoc
    var swaggerSpec = swaggerJSDoc(options);

    console.log(swaggerSpec);

    // app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));



    /** Routes configuration */
    var herosRoutes = require('../api/heros/heros.routes');
    // use express router
    app.use('/api', router);
    //call heros routing
    herosRoutes(router);


    // default route configuration
    app.get('/', (req, res) => {
      res.end('Hello World!');
    });

    httpServer.listen(webServerConfig.port)
      .on('listening', () => {
        console.log(`Web server listening on localhost:${webServerConfig.port}`);

        resolve();
      })
      .on('error', err => {
        reject(err);
      });
  });
}

module.exports.initialize = initialize;

function close() {
  return new Promise((resolve, reject) => {
    httpServer.close((err) => {
      if (err) {
        reject(err);
        return;
      }

      resolve();
    });
  });
}

module.exports.close = close;