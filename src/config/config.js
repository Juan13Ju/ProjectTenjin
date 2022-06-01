require("dotenv").config();
const config = {
    db_password : process.env.DB_PASSWORD,
    port : process.env.PORT || 4000,
    jwt_secret : process.env.JWT_SECRET
}

module.exports = config;