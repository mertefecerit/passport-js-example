const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const UserSchema = new Schema({
    first_name: {
        type:String,
        required: true,
        trim: true,
        min:3,
        max:255
    },
    last_name: {
        type:String,
        required: true,
        trim: true,
        min:3,
        max:255
    },
    status:{
        type: Boolean,
        default: false
    },
    email:{
        type:String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type:String,
        required:true,
    }
},{timestamps:true, versionKey:false});

module.exports = Mongoose.model('users', UserSchema);