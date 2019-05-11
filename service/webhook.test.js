const webhook = require('./webhook');


describe('getBotResponseMessage',() => {
    test('Bot Response - Should return  "May I know your first name ?" for hi', () => {
        const result = webhook.getBotResponseMessage('hi');
        expect(result.message.text).toMatch('May I know your first name ?');
    })
    
    test('Bot Response - Should return  "May I know your first name ?" for hi Alice', () => {
        const result = webhook.getBotResponseMessage('hi alice');
        expect(result.message.text).toMatch('May I know your first name ?');
    })
    
    test('Bot Response - Should return "Whats your birth date ?(in YYYY/MM/DD)" for any string that doesnt have the word hi', () => {
        const result = webhook.getBotResponseMessage('Bob');
        expect(result.message.text).toMatch("What's your birth date ?(in YYYY/MM/DD)");
    })
    
    test('Bot Response - Should not return "Whats your birth date ?(in YYYY/MM/DD)" for any string that have the word hi', () => {
        const result = webhook.getBotResponseMessage('hi Bob');
        expect(result.message.text).not.toMatch("What's your birth date ?(in YYYY/MM/DD)");
    })
    
    test('Bot Response - Should return "May I know your first name ?" for a valid date in the format YYYY/MM/DD', () => {
        const result = webhook.getBotResponseMessage('1994/05/10');
        expect(result.message.text).toMatch('Do you want to know how many days till next birthday ?');
    })
    
    test('Bot Response - Should return "May I know your first name ?" for a valid date in the format YYYY/MM/DD', () => {
        const result = webhook.getBotResponseMessage('1994/15/10');
        expect(result.message.text).not.toMatch('Do you want to know how many days till next birthday ?');
    })
    
    test('Bot Response - Should return when is the birthday', () => {
        const result = webhook.getBotResponseMessage('yes');
        expect(result.message.text).toMatch('birthday');
    })
    
    
    test('Bot Response - Should return "Good Bye👋" for no', () => {
        const result = webhook.getBotResponseMessage('no');
        expect(result.message.text).toMatch('Good Bye👋');
    })
    
    test('Bot Response - Should return "Good Bye👋" for nah', () => {
        const result = webhook.getBotResponseMessage('nah');
        expect(result.message.text).toMatch('Good Bye👋');
    })
    
    test('Bot Response - Should return "Good Bye👋" for No', () => {
        const result = webhook.getBotResponseMessage('nah');
        expect(result.message.text).toMatch('Good Bye👋');
    })
    
});
