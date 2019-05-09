var express = require('express');
var router = express.Router();

let messageController = require('../controller/message');

/* GET users listing. */
router.get('/messages', messageController.getAllReceivedMessages);
router.get('/message/:id', messageController.getMessage);
router.delete('/message/:id', messageController.deleteMessage);

module.exports = router;
