// Configuraciones generales del proyecto
require("dotenv").config();
const config = {
    db_password : process.env.DB_PASSWORD,
    port : process.env.PORT || 8000,
    jwt_secret : process.env.JWT_SECRET,
    cloudinary_cloud_key : process.env.CLOUDINARY_CLOUD_KEY,
    cloudinary_api_key : process.env.CLOUDINARY_API_KEY,
    cloudinary_api_secret : process.env.CLOUDINARY_API_SECRET
}

module.exports = config;