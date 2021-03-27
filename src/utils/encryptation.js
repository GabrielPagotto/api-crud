const bcrypt = require('bcrypt');
const salt = 10;

module.exports = {
    encrypt: function({ toEncrypt }) {
        return bcrypt.hash(toEncrypt, salt);
    },
    decrypt: function({ verification, toDecrypt }) {
        return bcrypt.compare(verification, toDecrypt);
    }
};
