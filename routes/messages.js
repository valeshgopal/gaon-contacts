const express = require('express');
const router = express.Router();

const {
  getMessages,
  createMessage,
} = require('../controller/messageController');

router.get('/', getMessages);

router.post('/', createMessage);

module.exports = router;
