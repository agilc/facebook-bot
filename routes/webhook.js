var express = require('express');
var router = express.Router();
let webhookController = require('../controller/webhook');

/* GET home page. */
router.get('/', webhookController.getWebhook);
router.post('/', webhookController.postWebhook);

module.exports = router;
