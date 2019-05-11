'use strict';
const axios = require('axios');
const { Message } = require('../model/message');
const { FACEBOOK_MESSAGE_URL, FACEBOOK_APP_ACCESS_TOKEN } = require('../constants/app');

let userResponsesYes = ['yes', 'yeah','yup'];
let userResponsesNo = ['no', 'nah'];
let lastBirthDay = "";
let recipientId = "";

module.exports.botResponse = async webhookData => {
    if(webhookData.message.text){
        console.log("message",webhookData);

        const message = new Message({
            message: webhookData.message.text,
            customerId: webhookData.recipient.id,
            direction: "FROM_CUSTOMER"
         });
        
        await message.save();

        sendResponse(webhookData.message.text, webhookData.sender.id);
    }
}

let getBotResponseMessage = userMessage => {
    let message = "";
    let messageBody= "";
    if(userMessage.split(" ").indexOf("hi") > -1){
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
    else if(!Date.parse(userMessage) && userResponsesYes.indexOf(userMessage.toLowerCase()) == -1 && userResponsesNo.indexOf(userMessage.toLowerCase()) == -1){
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
    else if(Date.parse(userMessage)){
        lastBirthDay = userMessage;
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
    else if( userResponsesYes.indexOf(userMessage.toLowerCase()) !== -1){
        var birthday = new Date(lastBirthDay);
        var today = new Date();
        birthday.setFullYear(today.getFullYear());
        if (today > birthday) {
            birthday.setFullYear(today.getFullYear() + 1);
        }

        let days = Math.floor((birthday - today) / (1000*60*60*24))
        if(days === 0)
            message = `Tomorrow is your birthday`;
        else if(days === 365)
        message = `Today is your birthday`;
        else
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
    else if( userResponsesNo.indexOf(userMessage.toLowerCase()) !== -1){
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

    return messageBody;
}

let sendResponse = async (type, recipientId) => {
    let response = "";
    let messageUrl = `${FACEBOOK_MESSAGE_URL}?access_token=${FACEBOOK_APP_ACCESS_TOKEN}`;
    let messageBody = "";
    recipientId = this.recipientId;
    console.log("in send response");    
    
    try{
        messageBody = getBotResponseMessage(type);
        console.log("axois send message data",messageUrl,messageBody);
        response = await axios({
            method: 'post',
            url: messageUrl,
            data: messageBody
        })

        // console.log("Bot response",response);
        const messageObj = new Message({
            message: messageBody.message.text,
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

module.exports.getBotResponseMessage = getBotResponseMessage;