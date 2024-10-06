const jwt = require("jsonwebtoken");
const moment = require('moment');
const geoip = require('geoip-lite');

const teacherAuthorizationMiddleware = async (req, res, next) => {
    try {
        console.log(req.role);

        if (req.role == "Teacher") {
            next();
        } else {
            return res
            .status(403)
            .json({
                statusCode: 403,
                error: 'You do not have permissions to access api'
            });
        }

    } catch (error) {
        return res
            .status(500)
            .json({
                statusCode: 500,
                error: error
            });
    }
}

module.exports = { teacherAuthorizationMiddleware }