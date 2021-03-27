const { Model, DataTypes } = require('sequelize');

class User extends Model {
    static init(sequelize) {
        super.init({
            username: DataTypes.STRING(16),
            firstName: DataTypes.STRING(16),
            lastName: DataTypes.STRING(30),
            email: DataTypes.STRING(40),
            password: DataTypes.STRING
        }, { sequelize });
    }
}

module.exports = User;
