const jwt = require('jsonwebtoken');
const JWT_SECRET = 'yup';

const fetchuser = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({status:false, message: "Please authenticate using a valid token" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.userExist = data
        next();
    } catch (error) {
        res.status(401).send({status:false, message: "Please authenticate using a valid token" })
    }

}


module.exports = {
    fetchuser
}