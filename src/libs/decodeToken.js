const jwt = require("jsonwebtoken");
const config = require("../config/config")
function decodeToken(token){
    const decodedToken = jwt.verify(token, config.jwt_secret);
    return decodedToken;
}

module.exports = decodeToken;