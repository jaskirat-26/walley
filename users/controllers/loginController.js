const user = require('../models/user')

const loginUser = (req, res) => {
    try{

    }catch (err){
        console.log(err);
    }
}

const index = (req,res) => {
    try{
        const data = {
            css: 'users/index.css'
        }
        console.log(data)
        res.status(200);
        res.render('./users/index', data)
    }catch(err){
        console.log(err);
    }
}


module.exports = {
    loginUser,
    index
}