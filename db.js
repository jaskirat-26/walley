const dotenv = require('dotenv');
dotenv.config();
var {mongoose} = require('mongoose');
mongoose.connect(process.env.MONGODB_URL);
var db = mongoose.connection;

function timeout(ms) {
    return new Promise((_, reject) => setTimeout(() => reject(new Error('Database connection timed out')), ms));
}

async function connectToDB() {
    try {
        await Promise.race([db.once('open', function callback () {
            console.log("Database Connected Successfully");
          }), timeout(3000)]);
    } catch (error) {
        console.error("Error connecting to the database:", error);
    }
}

module.exports = { connectToDB };