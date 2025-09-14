const swaggerautogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Contacts API',      
        description: 'A simple API to manage contacts'
    },
    host: 'localhost:https://cse341-w1-2-project.onrender.com/',
    schemes: ['http', 'https'],
};  

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/users.js'];

//this will generate the swagger-output.json file
swaggerautogen(outputFile, endpointsFiles, doc);