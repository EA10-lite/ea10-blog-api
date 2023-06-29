const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Thunder-blog API',
      version: '1.0.0',
      description: 'API documentation for Thunder-blog application',
      contact: {
        name: "Emmanuel Chris",
        email: "emanuelanyigor@gmail.com",
        url: "https://ea10.netlify.app/"
      },
      servers: [
        {
          url: "http://localhost:1234"
        }
      ]
    },
  },
  apis: ["./routes/*.js"], // Specify the path to your route files
};

const specs = swaggerJsdoc(options);

module.exports = { specs, swaggerUi };
