const Mongoose = require('mongoose');

Mongoose.connection.once("open", () => {
    console.log("MongoDB Connected");
})

const MongoDBConnection = async () => {
   await Mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);
} 

module.exports = {
    MongoDBConnection
}