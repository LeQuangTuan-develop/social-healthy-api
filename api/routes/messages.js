const express = require('express');
const router = express.Router();

const messageController = require('../app/controllers/Message.controller')

router.get('/:conversationId', messageController.index);
router.post('/create', messageController.create);

module.exports = router