require('dotenv/config')
const jwt = require('jsonwebtoken');


module.exports = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split('Bearer ')[1]
    } else {
        return res.status(401).json({ msg: "unauthorization" })
    }
    const userId = await jwt.verify(token, process.env.SECRET, (err, data) => {
        if (err) return res.status(401).json({ msg: "somting went wrong" })
        req.user = { id: data }
    })
    next()
}