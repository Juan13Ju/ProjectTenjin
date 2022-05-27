require("dotenv").config();
const config = {
    db_password : process.env.DB_PASSWORD,
    port : process.env.PORT || 4000   
}

module.exports = config;