const User = require('../models/User');
const encryptation = require('../utils/encryptation');
const dataVerify = require('../utils/dataVerify');

module.exports = class UserController {
    static async index(request, response) {
        const users = await User.findAll();

        return response.json(users);
    }

    static async store(request, response) {
        const user = request.body;
        const verifiedData = dataVerify.user({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password
        });

        if (!verifiedData.isValid) return response.status(406).json({ error: verifiedData.message });

        try {
            user.password = await encryptation.encrypt({ toEncrypt: user.password });
            
            const newUser = await User.create(user);
        
            newUser.password = undefined;
    
            return response.json(newUser);
        } catch (error) {
            const { errors } = error;

            if (errors) {
                errors.map(itemError => {
                    if (itemError.validatorKey === 'not_unique') {
                        if (itemError.path === 'users.username') return response.status(406).json({ error: 'This username already exists' });
                        if (itemError.path === 'users.email') return response.status(406).json({ error: 'This email already exists' }); 
                    }
                });
            }
        }
    }

    static async show(request, response) {
        const { id } = request.params;
        const user = await User.findByPk(id);
        
        user.password = undefined;

        return response.json(user);
    }

    static async update(request, response) {
        const { username, firstName, lastName, email, password } = request.body;
        const verifiedData = dataVerify.user({ username, firstName, lastName, email, password });

        if (!verifiedData.isValid) return response.status(406).json({ error: verifiedData.message });

        const { userId } = request;
        const user = await User.findByPk(userId);

        if (username) user.username = username;
        if (firstName) user.firstName = firstName;
        if (lastName) user.lastName = lastName;
        if (email) user.email = email;
        if (password) user.password = await encryptation.encrypt({ toEncrypt: password });

        user.save();
        user.password = undefined;

        return response.json(user);
    }

    static async destroy(request, response) {
        const { id } = request.params;
        const userToDelete = await User.findByPk(id);

        if (!userToDelete) return response.status(404).json({ error: 'User not found' });

        const deletedUser = await userToDelete.destroy();

        deletedUser.password = undefined;
        
        return response.json(deletedUser);
    }
}
