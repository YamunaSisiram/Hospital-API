import jwt from 'jsonwebtoken';

export const auth = async(req, res, next)=> {
    const jwtToken = req.headers['authorization'];
    jwt.verify(jwtToken, 'someSecretKey', (err, data)=> {
        if(err){
            console.log(err);
            return res.status(500).send('Unauthorized!! Login to continue')
        }else{
            req._id = data._id;
            req.user = data.user;
            next();
        }        
    })
}