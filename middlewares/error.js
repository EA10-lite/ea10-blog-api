const logger = require("../utils/logger");

module.exports = (err, req, res, next) => {
    // log the error 
    logger.error(err.message || "Something failed");
    
    res.status(500).send({ error: "Something Failed"});
} 