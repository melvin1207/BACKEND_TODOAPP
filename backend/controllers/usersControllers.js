const asyncHandler = require('express-async-handler')
const User = require('../models/usersModel')

const createUser = asyncHandler(async(req, res) => {
  res.status(201).json({ message: 'Crear usuario'})
})

const loginUser = asyncHandler(async(req, res) => {
  res.status(201).json({ message: 'Login usuario'})
})

const dataUser = asyncHandler(async(req, res) => {
  res.status(201).json({ message: 'Datos de usuario usuario'})
})

module.exports = {
  createUser,
  loginUser,
  dataUser
}