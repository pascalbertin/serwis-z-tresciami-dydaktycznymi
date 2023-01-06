const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.2',
    info: {
      version: "0.0.2",
      title: "Serwis z treściami dydaktycznymi - API",
      description: "Dokumentacja całego API dla strony Tutors Alpha",
      servers: ["http://localhost:3001","https://serwis-z-tresciami.herokuapp.com/"]
    },
    components: {
      securitySchemes: {
          bearerAuth: {
              type: 'http',
              scheme: 'bearer',
              bearerFormat: 'JWT',
          }
      }
  },
  security: [{
      bearerAuth: []
  }]
  },
  apis: ["./src/routes/*.js", "./src/models/*.js"]
};

module.exports = swaggerOptions;