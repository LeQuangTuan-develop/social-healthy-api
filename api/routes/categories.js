const express = require('express');
const router = express.Router();
const categoryController = require('../app/controllers/Category.controller')

router.get('/all', categoryController.index)
router.get('/:cateId', categoryController.show)
router.put('/update/:cateId', categoryController.update)
router.post('/create', categoryController.create)
router.delete('/delete/:cateId', categoryController.delete)

module.exports = router