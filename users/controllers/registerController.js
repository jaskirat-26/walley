const { response } = require('express');
const User = require('../models/user');
const Admin = require('../models/admin');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerationForm = (req,res) =>{
    try{
        return res.status(200).render('./users/register', {css: 'users/register.css'});
    }catch(err){
        console.log(err);
    }
}

const registerUser = async (req, res) => {
    try{
        console.log(req.body);
        const encryptedPwd = await bcrypt.hash(req.body.password, 10);
        const oldUser = await User.findOne({email:req.body.email});
        if (oldUser){
            console.log('User already exists')
            return res.status(409).send("User Already Exist. Please Login");
        }
        const newUser = new User({
            first_name: req.body.first_name ,
            last_name: req.body.last_name ,
            email: req.body.email ,
            password: encryptedPwd,
        }); 

        await newUser.save();
        const token = jwt.sign(
            {user_id: newUser._id, time: Date()},
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );

        newUser.token = token;
        res.red
        res.status(201).render('./views/login');
    }catch (err){
        console.log(err);
    }
}

const registerAdmin = async (req, res) => {
    try{
        console.log(req.body)
        if(!req.body.name || !req.body.email || !req.body.password){
            console.log('Invalid Request. Name, email and password are required.');
            return res.status(400).end();
        }
        const oldAdmin = await Admin.findOne({email:req.body.email});
        if (oldAdmin){
            console.log('Admin already exists')
            return res.status(409).send("Admin Already Exists.");
        }
        const encryptedPwd = await bcrypt.hash(req.body.password, 10);

        const newAdmin = new Admin({
            name: req.body.name ,
            email: req.body.email ,
            password: encryptedPwd,
        }); 

        await newAdmin.save();
        const token = jwt.sign(
            {user_id: newAdmin._id, time: Date()},
            process.env.TOKEN_KEY
        );

        newAdmin.token = token;
        res.status(201).json(token);
    }catch (err){
        console.log(err);
    }
}


module.exports = {
    registerationForm,
    registerUser,
    registerAdmin
}