const express = require('express');
const router = express.Router();

const userController = require('../app/controllers/User.controller')

router.get('/', userController.show);
router.get('/all', userController.index);
router.get('/doctors/:userId', userController.doctors);
router.post('/create', userController.create);
router.post('/auth/login', userController.login);
router.post('/auth/register', userController.register);
router.put('/:id', userController.update);
router.delete('/:id/force', userController.forceDelete);

module.exports = router