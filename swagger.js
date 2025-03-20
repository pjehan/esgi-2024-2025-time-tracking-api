import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: 'TimeTracking',
    description: 'TimeTracking API',
  },
  host: `localhost:${process.env.PORT}`
};

const outputFile = './swagger-output.json';
const routes = ['./app.js'];

swaggerAutogen({openapi: '3.0.0'})(outputFile, routes, doc);
