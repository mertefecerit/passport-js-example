const Mongoose = require('mongoose');

Mongoose.connection.once("open", () => {
    console.log("MongoDB Connected");
})

const MongoDBConnection = async () => {
   await Mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?authSource=admin`);
} 

module.exports = {
    MongoDBConnection
}