const express = require('express');
const {connectToDB} = require('./db');
const dotenv = require('dotenv');

dotenv.config();
const PORT = process.env.PORT;

connectToDB();

exports.test = function(req,res) {
  res.render('test');
};

app = express();
app.set('view engine', 'ejs');
