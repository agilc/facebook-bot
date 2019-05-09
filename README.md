# facebook-bot
This is a chat-bot for facebook. When a user messages to a connected facebook page the bot will reply automatically.

## How the bot works
The different replies of the bot are:
1. When a user messages with a word "hi" bot replay as "May I know your first name ?"
2. If the user provided valid name as reply bot will ask user's date of birth as "What's your birth date ?(in YYYY/MM/DD)".
3. If the user replied with valid date of birth, then bot will ask "Do you want to know how many days till next birthday ?".
4. The bot will accept different set of replies for this questions. The bot will provide two options to select as "Yes" or "No", as well as user can type set of replies such as 'yes', 'yeah','yup', 'no', 'no', 'nah'.
5. If the user replied with any of the above options meaning Yes then bot reply with number of days left to the next birthday as "There are <N> days left until your next birthday".
6. If the user replied with any options meaning No then the bot will reply Good Bye👋.

The application will save all the messages in the Database for persistance, and provided 3 API endpoints to interact with messages in the database, they are
1. List API to list all the received messages 
   request type : GET
   url : https://facebook-bot-task.herokuapp.com/messages

2. Get API to get details about a messages from message id(_id)
   request type : GET
   url : https://facebook-bot-task.herokuapp.com/message/{id} 

3. Delete API to delete a message from message id(_id) 
   request type : DELETE
   url : https://facebook-bot-task.herokuapp.com/message/{id}

## Technologies or frameworks Used
1. NodeJs
2. Express.js
3. axios
4. MongoDB with mongoose

The application is hosted in heroku.
