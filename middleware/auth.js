const JWT = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
    //Get token from header
    const token = req.header('x-auth-token');

    //Check if not token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' })
    }

    //Verify token
    try {
        const decoded = JWT.verify(token, config.get('jwtSecret'));
        req.user = decoded.user; // Allows req.user to be used in any protected routes and get user information(i.e. profile)
        next();
    } catch (err) {
        console.error(err.message)
        res.status(401).json({ msg: 'Token is not valid' });
    }
}