const User = require('../models/User');
const encryptation = require('../utils/encryptation');

module.exports = class UserController {
    static async index(request, response) {
        const users = await User.findAll();

        return response.json(users);
    }

    static async store(request, response) {
        const user = request.body;

        try {
            user.password = await encryptation.encrypt({ toEncrypt: user.password });
            
            const newUser = await User.create(user);
        
            newUser.password = undefined;
    
            return response.json(newUser);
        } catch (error) {
            const { errors } = error;

            errors.map(itemError => {
                if (itemError.validatorKey === 'not_unique') {
                    if (itemError.path === 'users.username') return response.status(406).json({ error: 'This username already exists' });
                    if (itemError.path === 'users.email') return response.status(406).json({ error: 'This email already exists' }); 
                }
            });
        }
    }

    static async show(request, response) {
        const { id } = request.params;
        const user = await User.findByPk(id);
        
        user.password = undefined;

        return response.json(user);
    }

    static async update(request, response) {
        const { id } = request.params;
        return response.json({ status: 'Atualizar' });
    }

    static async destroy(request, response) {
        const { id } = request.params;
        const userToDelete = await User.findByPk(id);

        if (!userToDelete) return response.status(404).json({ error: 'User not found' });

        const deletedUser = await userToDelete.destroy();

        deletedUser.password = undefined;
        
        return response.json(deletedUser);``
    }
}
