//requirements
const express = require('express');
const auth = require("./auth");
const morgan = require('morgan');
const tokenAuth = require('./auth');
const bodyParser = require('body-parser');
const userRoutes = require('./users/route');

//db connection
const {connectToDB} = require('./db');
connectToDB();


//start server
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT;
app = express();
app.listen(PORT, (err)=> {
  if(err){
    console.log(err);
  }else{
    console.log(`Server started at PORT: ${PORT}`);
  }
})

//register view engine
app.set('view engine', 'ejs');

//middleware and static files
app.use(express.static('.'));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});
app.use(bodyParser.urlencoded({extended: true}));

//token authentication
app.post("/", auth, (req, res, next) => {
  if (req.verified){
    console.log('request authenticated.')
    res.redirect('/users')
  }
});


app.get('/', (req, res) => {
  res.redirect('/users');
});

//user Routes
app.use('/users', userRoutes);

//invalid requests
app.use((req, res) => {
  console.log('invalid request');
  res.status(404);
  res.render('walley/404.ejs', {css:'users/index'});
});