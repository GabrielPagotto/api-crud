const User = require('../models/User');

module.exports = class UserController {
    static async index(request, response) {
        return response.send('O sistema de rotas está funcionando...')
    }

    static async store(request, response) {
        const user = request.body;
        const newUser = await User.create(user);

        return response.json({ newUser });
    }

    static async show(request, response) {
        const { id } = request.params;

        return response.json({ status: 'Selecionar um...' })
    }

    static async update(request, response) {
        return response.json({ status: 'Atualizar' });
    }

    static async destroy(request, response) {
        return response.json({ status: 'Deletar' });
    }
}
