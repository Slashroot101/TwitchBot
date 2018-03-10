var exports = module.exports = {};


/**
 * Returns whether it is prefixed or not, and the (without the prefix) message with it.
 * @param {string} str 
 * @param {string} prefix
 */
exports.isPrefixed = function(str, prefix){
    if(str.substr(0, prefix.length) === prefix){
        return {
            isPrefixed: true,
            msg: str.substr(prefix.length, str.length)
        };
    } else {
        return {
            isPrefixed: false,
            msg: str
        };
    }
}

/**
 * @param {string} msg
 * Checks to see if the string is all digits.
 */
exports.isAllDigits = function(msg){
    if(msg.match(/^[0-9]+$/) != null){
        return true;
    }
    return false;
}

/**
 * @param {array} commands
 * @param {string} msg
 * Returns true if this is a registered command.
 */
exports.isCommand = function(commands, msg){
    let command = msg.split(" ");
    for(let i = 0; i < commands.length; i++){
        if(commands[i].name === command[1]){
            return {command: commands[i], isCommand: true};
        }
    }
    return {command: {}, isCommand: false};
}

/**
 * 
 * @param {object} command 
 * @param {string} msg 
 * @param {string} author 
 * @param {string} channel 
 * @param {client} client 
 * Executes the given command.
 */
exports.executeCommand = function(command, msg, author, channel, client){
    console.log(command);
    return command.action(msg, author, channel, client);
}



/**
 * @param {string} msg
 * @param {object} metaData
 */

 exports.isAllCaps = function(msg, metaData){
    if(msg.toUpperCase() === msg && metaData['emotes-raw'] === null){
        return true;
    } else {
        return false;
    }
 }