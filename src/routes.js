const express = require('express')
const router = express.Router();
const { index, store, show, update, destroy } = require('./controllers/UserController');
const { authenticate, verifyToken } = require('./controllers/AuthController');

router.get('/user', index);
router.post('/user', store);
router.get('/user/:id', show);
router.put('/user', verifyToken, update);
router.delete('/user/:id', destroy);

router.post('/auth/login', authenticate);

module.exports = (application) => application.use(router);
