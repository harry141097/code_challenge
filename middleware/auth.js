const helpers = require("../utilities/helpers");
const config = require("../config");
let accessTokenSecret = config.token || "access-token-secret";

const isAuth = async (req, res, next) => {
    const tokenFromClient = req.headers.authorization;
    if (tokenFromClient) {
        try {
            if (accessTokenSecret) {
                const decoded = await helpers.verifyToken(tokenFromClient, accessTokenSecret);
                req.jwtDecoded = decoded;
                next();
            } else {
                throw new Error('Unauthorized')
            }
        } catch (error) {
            return res.status(401).json({
                message: 'Unauthorized.',
            });
        }
    } else {
        return res.status(403).send({
            message: 'No token provided.',
        });
    }
}

module.exports = {
    isAuth: isAuth,
};