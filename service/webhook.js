'use strict';
const axios = require('axios');
const { Message, validateMessage} = require('../model/message');

let userResponsesYes = ['yes', 'yeah','yup'];
let userResponsesNo = ['no', 'no', 'nah'];
let lastBirthDay = "";
let accessToken = "EAAGsqZBYf2AUBAGTQFDUcN5pZAKg2ZBLhQdHGs2fJpjxhZBMxLQPB18fgmHEMLdFm1KYI3PzVdkKaN0iPhMiA1eHlBDoGOe9r3s0f26fpArpbazXuVcfoChExhk91r4ZCWj6mqumumH2EvAABynCszEoIZC4m6MyKC0RbuGasZBpDYCe782FUcY";

module.exports.botResponse = async webhookData => {
    if(webhookData.message.text){
        console.log("message",webhookData);

        const message = new Message({
            message: webhookData.message.text,
            customerId: webhookData.recipient.id,
            direction: "FROM_CUSTOMER"
        });
        
        const result = await message.save();
        // console.log("Result",result);

        sendResponse(webhookData.message.text, webhookData.sender.id);
    }
}

let sendResponse = async (type, recipientId) => {
    let response = "";
    let message = "";
    let messageUrl = `https://graph.facebook.com/v3.3/me/messages?access_token=${accessToken}`;
    let messageBody = "";
    console.log("in send response");
    if(type === "hi"){
        message = "May I know your first name ?";
        messageBody = {
            "messaging_type": "RESPONSE",
            "recipient": {
                "id": recipientId
            },
            "message": {
                "text": message
            }
        }
    }
    else if(!Date.parse(type) && userResponsesYes.indexOf(type.toLowerCase()) == -1 && userResponsesNo.indexOf(type.toLowerCase()) == -1){
        message = "What's your birth date ?(in YYYY/MM/DD)";
        messageBody = {
            "messaging_type": "RESPONSE",
            "recipient": {
                "id": recipientId
            },
            "message": {
                "text": message
            }
        }
    }
    else if(Date.parse(type)){
        lastBirthDay = type;
        message="Do you want to know how many days till next birthday ?";
        messageBody = {
            "recipient": {
                "id": recipientId
            },
            "message":{
            "text": message,
            "quick_replies":[
            {
                "content_type":"text",
                "title":"Yes",
                "payload":"<POSTBACK_PAYLOAD>",
                "image_url":"https://cdn.pixabay.com/photo/2013/07/13/10/27/hand-157251_960_720.png"
            },
            {
                "content_type":"text",
                "title":"No",
                "payload":"<POSTBACK_PAYLOAD>",
                "image_url":"https://cdn.pixabay.com/photo/2013/07/13/10/27/dislike-157252_960_720.png"
            }
            ]
        }
        };
    }
    else if( userResponsesYes.indexOf(type.toLowerCase()) !== -1){
        var birthday = new Date(lastBirthDay);
        var today = new Date();
        birthday.setFullYear(today.getFullYear());
        if (today > birthday) {
            birthday.setFullYear(today.getFullYear() + 1);
        }

        let days = Math.floor((birthday - today) / (1000*60*60*24))
        message = `There are ${days} days left until your next birthday`;
        messageBody = {
            "messaging_type": "RESPONSE",
            "recipient": {
                "id": recipientId
            },
            "message": {
                "text": message
            }
        };
    }
    else if( userResponsesNo.indexOf(type.toLowerCase()) !== -1){
        message = "Good Bye👋";
        messageBody = {
            "messaging_type": "RESPONSE",
            "recipient": {
                "id": recipientId
            },
            "message": {
                "text": message
            }
        };
        
    }
    try{
        response = await axios({
            method: 'post',
            url: messageUrl,
            data: messageBody
        })

        // console.log("Bot response",response);
        const messageObj = new Message({
            message: message,
            customerId: recipientId,
            direction: "FROM_STORE"
        });
        
        await messageObj.save();
        console.log("Write success");
    }
    catch(error){
        console.log("error",error);
    }
    
    console.log("Write success",response);
}