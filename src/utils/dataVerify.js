module.exports = {
    user: function({ username, firstName, lastName, email, password }) {
        if ((username.split(' ')).length > 1) return notValid('Username must not contain spaces');
        if (username.length < 5 || username.length > 16) return notValid('Username must contain between 5 and 16 characters');
        if (firstName.length < 2 || firstName.length > 16) return notValid('First name must contain between 2 and 16 characters');
        if (lastName.length < 2 || lastName.length > 30) return notValid('Last name must contain between 2 and 30 characters');
        if ((email.split(' ')).length > 1) return notValid('Email must not contain spaces');
        if ((email.split('@')).length !== 2) return notValid('This email is not valid');
        if (email.length < 5 || username.length > 30) return notValid('First name must contain between 2 and 30 characters');

        return ({ isValid: true });
    }
}

function notValid(message) {
    return ({ isValid: false, message });
}
