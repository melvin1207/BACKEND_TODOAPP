const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/usersModel')

//crear un usuario
const createUser = asyncHandler(async(req, res) => {
  //se destructura el body de la petición
  const { name, email, password } = req.body

  //verificamos que se tengan todos los datos
  if(!name || !email || !password){
    res.status(400)
    throw new Error('Se necesitan datos completos')
  } 

  //se verifica que el usuario no exista 
  const userExist = await User.findOne({ email })
  if(userExist){
    res.status(400)
    throw new Error('El usuario ya existe con ese email')
  }

  //HASH del password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  //se crea el usuario
  const user = await User.create({
    name, 
    email,
    password: hashedPassword
  })

  if(user){
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email
    })
  } else{
    res.status(400)
    throw new Error('No se pudieron guardar los datos  en la base de datos')
  }
})

//logear al usuario
const loginUser = asyncHandler(async(req, res) => {
  const { email, password} = req.body

  //se verifica que exista un usuario con ese email
  const user = await User.findOne({ email })

  //si existe se verifica el password
  if(user && (await bcrypt.compare(password, user.password))){
    res.status(200).json({
      _id:user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id)
    })
  } else{
    res.status(400)
    throw new Error('Credenciales incorrectas')
  }
})

//obtener la información del usuario
const dataUser = asyncHandler(async(req, res) => {
  res.status(200).json(req.user)
})

//se debe generar un token
const newToken = (id_user) => {
  return jwt.sign({ id_user }, process.env.JWT_SECRET, {
    expiresIn: "3d"
  })
}

module.exports = {
  createUser,
  loginUser,
  dataUser
}