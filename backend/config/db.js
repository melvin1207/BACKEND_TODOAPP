const mongoose = require('mongoose')

const coonectDB = async() => {
  try{
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`MongoDB Conectado: ${conn.connection.host}`.cyan.underline)
  } catch(error){
    console.log(error)
    process.exit(1)
  }
} 

module.exports = coonectDB