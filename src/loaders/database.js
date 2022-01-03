const Mongoose = require('mongoose');

Mongoose.connection.once("open", () => {
    console.log("MongoDB Connected");
})

const MongoDBConnection = async () => {
   await Mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jsvxs.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`);
} 

module.exports = {
    MongoDBConnection
}