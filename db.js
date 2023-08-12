const dotenv = require('dotenv');
dotenv.config();
var {mongoose} = require('mongoose');
mongoose.connect(process.env.MONGODB_URL);
var db = mongoose.connection

async function connectToDB() {
    try {
        db.once('open', function callback () {
            console.log("Database Connected Successfully");
    })} catch (error) {
        console.error("Error connecting to the database:", error);
    }
}

module.exports = { connectToDB };