const User = require('../models/User');
const encryptation = require('../utils/encryptation');
const jsonwebtoken = require('jsonwebtoken');
const { SECRET } = process.env;

module.exports = class AuthController {
    static async authenticate(request, response, next) {
        const { username, password } = request.body;
        const user = await User.findOne({ where: { username }});

        if (!user) return response.status(404).json({ auth: false, error: 'User not found' });

        const passwordIsValid = await encryptation.decrypt({ verification: password, toDecrypt: user.password });

        if (!passwordIsValid) return response.status(401).json({ auth: false, error: 'Invalid password' });

        const token = jsonwebtoken.sign({ id: user.id }, SECRET, { expiresIn: 900 });

        return response.json({ auth: true, token });
    }

    static async verifyToken(request, response, next) {
        const { authorization } = request.headers;

        if (!authorization) return response.status(401).json({ error: 'No token provided' });

        const tokenValues = authorization.split(' ');
        
        if (tokenValues.length < 2) return response.status(401).json({ error: 'The authorization token is invalid' });
        if (tokenValues[0] !== 'Bearer' || tokenValues[0] === '') return response.status(401).json({ error: `The authorization token not contains the prefix 'Bearer'` });

        const token = tokenValues[1];
        
        try {
            const decoded = jsonwebtoken.verify(token, SECRET, { expiresIn: 900 });

            request.userId = decoded.id;

            next();
        } catch (error) {
            if (error.expiredAt) return response.status(401).json({ error: 'The token has expired' });
        }
    }
}
