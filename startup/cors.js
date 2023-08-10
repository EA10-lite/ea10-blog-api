const cors = require("cors");

const options = {
    origin: ["http://localhost:5173", "http://localhost:3000", "http://localhost:3001"],
    'Access-Control-Allow-Origin': 'http://localhost:5173',
    'Access-Control-Allow-Credentials': true,
    credentials: true 
}

module.exports = function(app){
    app.use(cors(options));
}