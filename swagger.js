const swaggerautogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Contacts API',      
        description: 'A simple API to manage contacts'
    },
    host: 'localhost:3000',
    schemes: ['http', 'https'],
};  

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/users.js'];

//this will generate the swagger-output.json file
swaggerautogen(outputFile, endpointsFiles, doc);