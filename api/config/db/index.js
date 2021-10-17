const mongoose = require('mongoose')

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/doctor', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("connect successfully");
    } catch (error) {
        console.log("connect error: ", error);
    }
}

module.exports = {connect}