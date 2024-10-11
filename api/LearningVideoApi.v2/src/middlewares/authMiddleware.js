const jwt = require("jsonwebtoken");
const moment = require('moment');
const geoip = require('geoip-lite');

const authMiddleware = async (req, res, next) => {
    try {
        var ipAddress = req.ip;
        if (!req.ip) {

            if (process.env.NODE_ENV !== 'Development') {
                return res
                    .status(400)
                    .json({
                        statusCode: 400,
                        error: "x-real-ip header is required"
                    });
            }

            ipAddress = '171.226.34.164';
        } else {
            ipAddress = req.ip;
        }

        const requestHeader = req.header('Authorization');
        if (!requestHeader) {
            return res
                .status(400)
                .json({
                    statusCode: 400,
                    error: "Authorization header is required"
                });
        }

        const token = req.header('Authorization').replace('Bearer ', '');
        if (token.length <= 0) {
            return res
                .status(400)
                .json({
                    statusCode: 400,
                    error: "Bearer token is empty"
                });
        }

        decodedToken = jwt.verify(token, 'secret');
        if (!decodedToken) {
            return res
                .status(401)
                .json({
                    statusCode: 401,
                    error: "Not authenticated."
                })
        }

        req.role = decodedToken.role;
        req.loggingUserId = decodedToken.id;
        next();
    } catch (error) {
        return res
            .status(500)
            .json({
                statusCode: 500,
                error: error
            });
    }
}

module.exports = { authMiddleware }