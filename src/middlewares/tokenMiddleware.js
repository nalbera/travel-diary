const {Users} = require('../database/config/db');
const jwt = require('jsonwebtoken');

const tokenMiddleware = async (req,res,next) => {
    try {
        const { authorization } = req.headers;

        if(!authorization) return res.status(401).send('Missing authorization header');

        let tokenInfo;

        try {
            tokenInfo = jwt.verify(authorization,process.env.SECRET);
        } catch (error) {
            return res.status(401).send('Invalid token');
        }

        const user = Users.findByPk(tokenInfo.id);

        const lastUpdate = new Date(user.lastAuthUpdate);
        const timesCreateToken = new Date(tokenInfo.iat)
        
        if(timesCreateToken < lastUpdate){
            res.status(401).send('Expired Token');
        }

        req.userInfo = tokenInfo;
        
        next();
    } catch (error) {
        console.log(error);
    }
}

module.exports = tokenMiddleware;