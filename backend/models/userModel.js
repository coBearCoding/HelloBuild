const {Schema, model} = require('../config/database');

/**
 * @name userModel
 * @description Model and Schema of the User
 */
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    token: String
});





module.exports = model('UserModel', userSchema);