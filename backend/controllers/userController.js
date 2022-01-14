const UserModel = require('../models/userModel');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const loginUser = async (req, res) => {
    try{
    const {email, password:UnhashedPassword} = req.body;

    const user = await UserModel.findOne({
        email: email,
    });

    console.log(user);

    if(!user){
        return res.status(404).json({
            'msg': 'User Not Found'
        });
    }

    const passwordChecked = await bcrypt.compare(UnhashedPassword, user.password);

    if(!passwordChecked){
        return res.status(400).json({
            'msg': 'Incorrect password'
        });
    }
    
    const token = jwt.sign({
        email
    }, process.env.TOKEN_KEY,
    {
        expiresIn: '2h'
    });


    return res.status(200).json({
        'user': user,
        'token': token
    });
    }
    catch(error){
        console.log(error);
        return res.status(400).json({
            'error': error
        });
    }
}

const registerUser = async (req, res) => {
    try{
        const {email, password:UnhashedPassword} = req.body;
        const userExists = await UserModel.findOne({
            email,
        });
    
        if(userExists){
            return res.status(400).json({
                'msg': 'User already registered'
            });
        }


        const saltRounds = process.env.SALT_ROUNDS;
        const salt = await bcrypt.genSalt(parseInt(saltRounds));
        const password = await bcrypt.hash(UnhashedPassword, salt);

        const response = await UserModel.create({
            email,
            password
        });

        const token = jwt.sign({
            email
        }, process.env.TOKEN_KEY,
        {
            expiresIn: '2h'
        });
        
        return res.json({
            'msg': 'User registered',
            'user': response,
            'token': token
        });
    }catch(error){
        console.log(error);
        return res.status(400).json({
            'error': error
        });
    }
    
}

module.exports = {
    loginUser,
    registerUser
}