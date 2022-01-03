const UserModel = require('../models/User');


const insert = async (payload) => {
    const newUser = new UserModel(payload);
    return await newUser.save();
}

const read = async (email) => {
    return await UserModel.findOne({email});
}

const activateUser = async(email) => {
    const user = await UserModel.findOne({email});
    if(user.status===false){
        return await UserModel.findOneAndUpdate({email},{status:true});
    }
    return null;
}

module.exports = {
    insert,
    read,
    activateUser
}