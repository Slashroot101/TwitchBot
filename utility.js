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
            msg: ""
        };
    }
}



/**
 * @param {array} commands
 * @param {string} msg
 */

exports.isCommand = function(commands, msg){
    let command = msg.split(" ");
    for(let i = 0; i < commands.length; i++){
        if(commands[i].name === command[1]){
            return commands[i].action(msg);
        }
    }
    return false;
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