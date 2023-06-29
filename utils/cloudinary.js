const cloudinary = require('cloudinary').v2;
const logger = require("./logger");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret : process.env.CLOUDINARY_SECRET
});


const upload_file = (path) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(path, function(err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
};

const upload_files = async (paths) => {
    try {
        const uploadPromises = paths.map(imagePath => upload_file(imagePath));
        const uploadedImages = await Promise.all(uploadPromises);
        return uploadedImages;
    } catch (error) {
        console.error(error);
        logger.error(error.message || "something failed while trying to uplodad files to cloudinary");
    }
}


module.exports = {
    upload_file,
    upload_files    
}