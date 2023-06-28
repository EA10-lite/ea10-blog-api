
module.exports = () => {
    if(!process.env.JWT_SECRET_KEY){
        console.log("FATAL ERROR: NO JWT SECRET PORVIDED")
        process.exit(1);
    }
}