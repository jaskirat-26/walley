const { response } = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
    try{
        console.log(req.body)
        const hashedPwd = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            first_name: req.body.first_name ,
            last_name: req.body.last_name ,
            email: req.body.email ,
            password: hashedPwd,
        }); 
        await newUser.save();
        res.status(201);
        res.status(200);
        res.end();
    }catch (err){
        console.log(err);
    }
}


module.exports = {
    registerUser
}