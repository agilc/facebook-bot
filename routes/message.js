var express = require('express');
var router = express.Router();

let messageController = require('../controller/message');

/* GET users listing. */
router.get('/messages', messageController.getAllReceivedMessages);

module.exports = router;
