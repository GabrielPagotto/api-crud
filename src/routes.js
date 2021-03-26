const express = require('express')
const router = express.Router();
const { index, store, get, update, destroy } = require('./controllers/UserController');

router.get('/user', index);
router.post('/user', store);
router.get('/user/:id', get);
router.put('/user', update);
router.delete('/user', destroy);

module.exports = (application) => application.use(router);
