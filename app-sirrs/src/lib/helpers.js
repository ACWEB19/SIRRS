const bcrypt = require('bcryptjs');
const helpers = {};

helpers.encryptPassword = async (password) =>{
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password,salt);
    return hash;
};

helpers.comparePassword = async(password, passwordDB)=>{
    try {
        return await bcrypt.compare(password, passwordDB); 
    } catch (e) {
        console.log(e);
        
    }
};

module.exports = helpers;