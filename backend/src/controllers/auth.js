import jwt from 'jsonwebtoken';
import { tokenSecret } from '../../defs.js';

export const generateAccessToken = (username) => {
    return jwt.sign(username, tokenSecret, { expiresIn: '15m' });
}

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers('authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, tokenSecret, (err, user) => {
        console.log(err)
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}