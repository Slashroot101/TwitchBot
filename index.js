var tmi = require("tmi.js");
var utility = require('./utility');
const prefix = "!s";
var client = new tmi.client({
    identity: {
        username: "slashroot101",
        password: "oauth:ntmmcrp0mzngcov9l9kci9q9ijomos"
    },
    channels: ["slashroot101"]
});
var commands = require('./commands/index');

client.connect();

client.on("join", function(channel, username, self){
    client.say(channel, "I have joined the channel.");
});

client.on("message", function(channel, username, message, self){
    if (self) return;
    let messageParsed = utility.isPrefixed(message, prefix);
    if(messageParsed.isPrefixed){
        if(utility.isCommand(commands, messageParsed.msg) === false){
            return;
        } else {
            client.say(channel, `@${username.username}:` + utility.isCommand(commands, messageParsed.msg));
        }
    } else {
        if(utility.isAllCaps(messageParsed.msg, username)){
            client.say(channel, '@' + username.username + ': Please do not type in all caps!');
            client.say(channel, '/clear');
        }
    }
});




