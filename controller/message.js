'user strict';
const messageService = require('../service/message');

exports.getAllReceivedMessages = async (req,res) => {
    let searchParams = {
        direction : "FROM_CUSTOMER"
    }

    messageService.getAllReceivedMessages(searchParams,res);
}

exports.getMessage = async (req,res) => {
    let searchParams = {
        direction : "FROM_CUSTOMER",
        _id: req.params.id
    }

    messageService.getMessage(searchParams,res);
}