const logger = require("../utils/logger");

module.exports = () => {
    if(!process.env.JWT_SECRET_KEY){
        logger.error("FATAL ERROR: NO JWT SECRET PORVIDED")
        process.exit(1);
    }
}