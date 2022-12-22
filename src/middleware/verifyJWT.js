const jwt = require('jsonwebtoken');
const AppError = require("../helpers/AppError");
const { AUTH_ERROR } = require("../helpers/errorCodes");
const { INVALID_TOKEN, USER_FORBIDDEN } = require("../helpers/errorMessages");

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader?.startsWith('Bearer ')) {
        throw new AppError(AUTH_ERROR, USER_FORBIDDEN, 401);
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) {
                throw new AppError(AUTH_ERROR, INVALID_TOKEN, 403);
            }

            req.user = decoded.UserInfo.username;
            req.roles = decoded.UserInfo.roles;
            next();
        }
    );
}

module.exports = verifyJWT