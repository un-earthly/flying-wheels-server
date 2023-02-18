const jwt = require('jsonwebtoken');
module.exports = function verifyJWT(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send({ message: 'Un Authorized User' })
    }
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT__SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).send({ message: 'Forbidden access' });
        }
        req.decoded = decoded;
        next();
    })
}