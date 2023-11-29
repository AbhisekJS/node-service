const mongoose = require('mongoose')

const connectionString = process.env['MONGODB_URI'];
console.log(connectionString);
const db = async () =>{
    try{
        await mongoose.connect(connectionString, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    }catch(err){
        console.error('MongoDB connection error:', err);
    }
}

module.exports = {
    db
}

