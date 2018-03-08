module.exports = [
    {
        name: "multiply",
        action: function(msg, author){
            let split = msg.split(" ");
            let sum = 1;
            for(let i = 2; i < split.length; i++){
                sum = sum * parseInt(split[i]);
            }
            console.log(split.length);
            if(split.length === 3 || split.length === 2){
                return `You must enter numbers! Such as multiply 5 2.`
            } else {
                if(!isNaN(sum)){
                    return `The value is: ${sum}.`
                } else {
                    return `You must enter numbers! Such as multiply 5 2.`
                }
            }
        }
    }
];