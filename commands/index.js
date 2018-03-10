const database = require('../database.js');
module.exports = [
    {
        name: "multiply",
        action: function(msg, author, channel, client){
            let split = msg.split(" ");
            let sum = 1;
            for(let i = 2; i < split.length; i++){
                sum = sum * parseInt(split[i]);
            }
            if(split.length === 3 || split.length === 2){
               client.say(channel, `You must enter numbers! Such as multiply 5 2.`);
            } else {
                if(!isNaN(sum)){
                    client.say(channel, `The value is: ${sum}.`);
                } else {
                    client.say(channel, `You must enter numbers! Such as multiply 5 2.`);
                }
            }
        }
    },
    {
        name: "seen",
        action: function(msg, author, channel, client){
            let split = msg.split(" ");
            let userSeen = split[2];
            database.lastSeen(userSeen, channel)
                .then(function(data){
                    if(data === null){
                        client.say(channel, "The user has never been to the stream!");
                    }
                    if(data.isWatching){
                        client.say(channel, "The user is currently watching!");
                    } else {
                        client.say(channel, "The user was last seen: " + data.lastSeen);
                    }
                })
                .catch(function(err){
                    return err;
                });
        }
    },
    {
        name: "top",
        action: function(msg, author, channel, client){
            database.getTop(channel)
                .then(function(data){
                    if(data === null){
                        client.say(channel, "Not enough data has been collected yet for this channel!");
                    } else {
                        if(data.length === 3){
                            let top1 = `1. ${data[0].username}: ${data[0].numMessage},`;
                            let top2 = `2. ${data[1].username}: ${data[1].numMessage}, `;
                            let top3 = `3. ${data[2].username}: ${data[2].numMessage}`;
                            client.say(channel,`Top Chatters:`);
                            client.say(channel, top1);
                            client.say(channel, top2);
                            client.say(channel, top3);
                        } else if(data.length === 2){
                            let top1 = `1. ${data[0].username}: ${data[0].numMessage},`;
                            let top2 = `2. ${data[1].username}: ${data[1].numMessage}, `;
                            let top3 = `3. TBD`;
                            client.say(channel,`Top Chatters:`);
                            client.say(channel, top1);
                            client.say(channel, top2);
                            client.say(channel, top3);
                        } else if(data.length === 1){
                            let top1 = `1. ${data[0].username}: ${data[0].numMessage},`;
                            let top2 = `2. TBD, `;
                            let top3 = `3. TBD`;
                            client.say(channel,`Top Chatters:`);
                            client.say(channel, top1);
                            client.say(channel, top2);
                            client.say(channel, top3);
                        }
                        console.log(data);
                    }
                })
        }
    }
];