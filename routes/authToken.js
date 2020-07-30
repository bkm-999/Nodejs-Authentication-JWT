const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const token = req.header('givenToken');
    if(!token) return res.status(401).send('Can Not Access!!!');

    try{
        const verified = jwt.verify(token, process.env.APP_TOKEN_CONFIG);
        req.userExist = verified;
        next();
    }catch (err){
        res.status(400).send('Something Wrong with Token');
    }
    
}
module.exports = verifyToken;