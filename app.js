const express = require('express');
const path = require('node:path');
const {connectToDB} = require('./db');
const dotenv = require('dotenv');

const userRoutes = require('./users/route');


dotenv.config();
const PORT = process.env.PORT;

connectToDB();

exports.test = function(req,res) {
  res.render('test');
};

app = express();
app.listen(PORT, (err)=> {
  if(err){
    console.log(err);
  }else{
    console.log(`Server started at PORT: ${PORT}`);
  }
})

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
  res.redirect('/users');
});

app.use('/users', userRoutes);

app.set('views', path.join(__dirname , "walley/views"));

app.use((req, res) => {
  res.status(404);
  res.render('404.ejs');
});