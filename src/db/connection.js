const mongoose = require('mongoose')


const connection = mongoose.connect(`mongodb://127.0.0.1:27017/electronics`, {useNewUrlParser:true})
.then(()=>{
    console.log("Connected to the database")
})
.catch(()=>{
    console.log("Not connected")
})

module.exports = connection