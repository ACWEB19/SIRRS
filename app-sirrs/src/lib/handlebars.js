// como se va a comportar timeago
const {format} = require('timeago.js');


const helpers = {};

helpers.timeago = (timestamp)=>{
    return format(timestamp);
};


module.exports = helpers;