var exports = module.exports = {};
var user = require('./database/chatUser');

/**
 * @param {string} username
 * @param {string} channel
 * Creates a new user given the username in that channel.
 */
exports.createUser = function(username, channel){
    return new Promise((resolve, reject) => {
        let newUser = new user(
            {
                username: username,
                numMessage: 0,
                channel: channel,
                isWatching: false
            }
        );
        newUser.save()
            .then(function(success){
                console.log(success);
                resolve();
            })
            .catch(function(err){
                reject(err);
            });
    });
}


/**
 * 
 * @param {string} channel 
 * Gets the top users from this channel.
 */
exports.getTop = function(channel){
    return new Promise((resolve, reject) => {
        user.find(
            {
                //all
            }
        ).sort(
            {
                "numMessage": 1
            }
        )
        .then(function(data){
            resolve(data);
        })
        .catch(function(err){
            reject(err);
        });
    });
}

/**
 * 
 * @param {string} username 
 * @param {string} channel 
 * Increments the message counter so we can rank.
 */
exports.increaseMessageCount = function(username, channel){
    return new Promise((resolve, reject) => {
        user.update(
            {
                username: username,
                channel: channel
            },
            {
                $inc: {numMessage: 1}
            }
        )
        .then(function(user){
            resolve(user);
        })
        .catch(function(err){
            reject(err);
        });
    });
}

/**
 * @param {string} username
 * @param {string} channel
 * @param {boolean} isWatching
 * Sets the user's active state to isWatching watching the stream
 */
exports.setActive = function(username, channel, isWatching){
    return new Promise((resolve, reject) => {
        user.update(
            {
                username: username,
                channel: channel
            },
            { isWatching: isWatching}
            
        )
        .then(function(){
            console.log('Success!');
            resolve();
        })
        .catch(function(err){
            console.log(err);
            reject(err);
        });
    });
}


/**
 * @param {string} username
 * @param {string} channel
 * Updates last time left that channel.
 */
exports.updateLeaveHistory = function(username, channel){
    return new Promise((resolve, reject) => {
        console.log('Updating leave history' + username + channel);
        user.update(
            {
                username: username,
                channel: channel
            },
            { lastSeen: Date()}
            
        )
        .then(function(){
            console.log('Success!');
            resolve();
        })
        .catch(function(err){
            console.log(err);
            reject(err);
        });
    });
}

/**
 * 
 * @param {string} username 
 * @param {string} channel 
 */
exports.lastSeen = function(username, channel){
    return new Promise((resolve, reject) => {
        user.findOne(
            {
                username: username,
                channel: channel
            }, function(err, data){
                if(err){
                    reject(err);
                }
                resolve(data);
            }
        );
    });
}