
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.header("x-auth-token");
    if(!token) return res.status(401).send({ data: null, message: "Access Denied: No JWT TOKEN", success: false });
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = user;
        next();
    } catch (error) {
        res.status(401).send({ data: null, message: "Access Denied: No JWT TOKEN", success: false });
    }
}