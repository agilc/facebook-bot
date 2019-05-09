'use strict';

const { Message } = require('../model/message');

exports.getAllReceivedMessages = async (filter,res) => {
    try{
        let messages = await Message.find(filter);
        res.status(200).send(messages);
    }
    catch(error){
        console.log("error while getting messages",error);
        res.status(500);
    }

    
}