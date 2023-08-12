const dotenv = require('dotenv');
dotenv.config();

const {MongoClient} = require('mongodb');
const database = process.env.MONGODB_URL;
console.log(database)
const client = new MongoClient(database);

function timeout(ms) {
    return new Promise((_, reject) => setTimeout(() => reject(new Error('Database connection timed out')), ms));
}

async function connectToDB() {
    try {
        await Promise.race([client.connect(), timeout(3000)]);
        console.log("Connected to the Database");
    } catch (error) {
        console.error("Error connecting to the database:", error);
    }
}

module.exports = { connectToDB };