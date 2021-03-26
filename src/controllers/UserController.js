module.exports = class UserController {
    static index(request, response) {
        return response.send('O sistema de rotas está funcionando...')
    }

    static store(request, response) {
        return response.json({ status: 'Criar' });
    }

    static get(request, response) {
        const { id } = request.params;

        return response.json({ status: 'Selecionar um...' })
    }

    static update(request, response) {
        return response.json({ status: 'Atualizar' });
    }

    static destroy(request, response) {
        return response.json({ status: 'Deletar' });
    }
}
