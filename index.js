const tmi      = require("tmi.js");
const utility  = require('./utility');
const config   = require('./config');
const mongoose = require('mongoose');
const commands = require('./commands/index');
const database = require('./database.js');
const prefix = "!s";
const client = new tmi.client({
    identity: {
        username: config.twitch.username,
        password: config.twitch.password
    },
    channels: ["slashroot101", "slashrootbot", "moonstreuxx"]
});

client.connect();

mongoose.connect(config.database.url)
.then(function(success){
    console.log(`Successfully connected to DB!`);
})
.catch(function(err){
    console.log(err);
});

client.on("join", function(channel, username, self){
    if (self) return;
    console.log('join');
    database.createUser(username, channel)
        .then(function(user){
            database.setActive(username, channel, true)
            .then(function(){
                return;
            })
            .catch(function(err){
                console.log(err);
            });
        })
        .catch(function(err){
            if(err.name === 'BulkWriteError' && err.code === 11000){
                database.setActive(username, channel, true)
                    .then(function(){
                        return;
                    })
                    .catch(function(err){
                        console.log(err);
                    });
            }
        });

});

client.on("part", function(channel, username, self){
    if(self) return;
    database.updateLeaveHistory(username, channel)
        .then(function(){
            database.setActive(username, channel, false)
            .then(function(){
                return;
            })
            .catch(function(err){
                console.log(err);
            });
        })
        .catch(function(err){
            database.createUser(username, channel)
                .then(function(){
                    database.setActive(username, channel, false)
                    .then(function(){
                        return;
                    })
                    .catch(function(err){
                        console.log(err);
                    });
                })
                .catch(function(err){
                    console.log(err);
                });
        });
});

client.on("message", function(channel, username, message, self){
    if (self) return;
    let messageParsed = utility.isPrefixed(message, prefix);
    if(messageParsed.isPrefixed){
        let isCommand = utility.isCommand(commands, messageParsed.msg);
        console.log(isCommand);
        if(isCommand.isCommand === false){
            console.log('Is not command');
            return;
        } else {
            console.log('Is command')                         
            utility.executeCommand(isCommand.command, messageParsed.msg, username, channel, client);
        }
    } else {
        /*
        if(messageParsed.msg.length != 1){
            if(utility.isAllDigits(messageParsed.msg) === true){
                database.increaseMessageCount(username.username, channel)
                .then(function(data){
                    return;
                })
                .catch(function(err){
                    console.log(err);
                });
            } else {
                if(utility.isAllCaps(messageParsed.msg, username)){
                    client.say(channel, username.username + ' - Please do not type in all caps!');
                    return;
                }
            }
        } else {
            database.increaseMessageCount(username.username, channel)
            .then(function(data){
                console.log(data);
            })
            .catch(function(err){
                console.log(err);
            });
        }

        */
    }
});




