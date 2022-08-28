// Mongo Atlas Connection

require('dotenv').config();
const mongoose = require('mongoose');

const mongoURI = process.env.DATABASE_URL;
const db = mongoose.connection;

mongoose.connect(mongoURI);
// Define callback functions for various events
db.on("error", (err) => console.log(err.message + " is Mongod not running?"));
db.on("connected", () => console.log("mongo connected at: ", mongoURI));
db.on("disconnected", () => console.log("mongo disconnected"));

// Open the Connection
db.on("open", () => {
    console.log("✅ mongo connection made!");
  });


  module.exports = mongoose;