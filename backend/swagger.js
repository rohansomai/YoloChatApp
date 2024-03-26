/*Generating API docs automatically*/
const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger_output.json';
const endpointsFiles = ['./routes/chatRoutes', './routes/userRoutes'];

swaggerAutogen(outputFile, endpointsFiles);
