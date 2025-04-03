const jwt = require('jsonwebtoken');


const verifyToken = async (req, res, next) => {

    try {

        const token = req.headers.authorization;

        if (!token) {
            return res.status(501).send({
                success: false,
                message: "TOKEN IS REQUIRE"
            })
        }

        const newtoken = token.slice(7);

        jwt.verify(newtoken, 'neha', (err, decode) => {
            if (err) {
                return res.status(401).send({
                    success: false,
                    message: "TOKEN IS NOT VALID"
                })
            }
            req.user = decode.payload;
            return next();
        })

    } catch (error) {
        return res.status(401).send({
            success: false,
            err: error
        })
    }
}

const checkAdmin = async (req, res, next) => {
    if (req.user?.role != 'admin') {
        return res.status(403).send({
            success: false,
            message: "YOU ARE NOT ADMIN"
        })
    }
    return next();
}



module.exports = {
    verifyToken,
    checkAdmin
}