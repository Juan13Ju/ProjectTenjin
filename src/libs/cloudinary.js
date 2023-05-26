const cloudinary = require('cloudinary').v2;
const config = require("../config/config")

// Configuration 
cloudinary.config({
  cloud_name: config.cloudinary_cloud_key,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret
});