const UserModel = require('../models/User');


const insert = async (payload) => {
    const newUser = new UserModel(payload);
    return await newUser.save();
}

module.exports = {
    insert,
}