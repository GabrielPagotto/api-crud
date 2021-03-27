const express = require('express')
const router = express.Router();
const { index, store, show, update, destroy } = require('./controllers/UserController');

router.get('/user', index);
router.post('/user', store);
router.get('/user/:id', show);
router.put('/user/:id', update);
router.delete('/user/:id', destroy);

module.exports = (application) => application.use(router);
