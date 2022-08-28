const jwt = require('jsonwebtoken');
require('dotenv').config();

//validation de l'utilisateur(token)
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedtoken = jwt.verify(token, process.env.DB_TOKEN);
        const userId = decodedtoken.userId;
        if(req.body.userId && req.body.userId !== userId){
            throw 'User ID non valid';
        }else{
            next();
        }

    } catch (error){
        res.status(403).json({error});
    }
};