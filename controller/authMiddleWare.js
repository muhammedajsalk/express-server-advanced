const jwt = require('jsonwebtoken')
const jwt_secret_code = process.env.ACCESS_TOKKEN_SECRET

function authMiddleware(req, res, next) {
    const authHeader = req.headers['authorization']
    console.log(authHeader);

    const token = authHeader && authHeader.split(' ')[1]
    console.log(token)
    if (!token) return res.status(401).json({ error: "Access token is missing" })
    jwt.verify(token, jwt_secret_code, (err,user) => {
       if (err) return res.status(403).json({ error: "Token is invalid or expired" })
       req.user=user
       next()
    })
}

module.exports=authMiddleware