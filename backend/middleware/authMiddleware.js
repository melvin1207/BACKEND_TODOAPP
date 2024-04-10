const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/usersModel')

const protect = asyncHandler(async (req, res, next) => {
  let token

  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    try{
      //Se obtiene el token
      token = req.headers.authorization.split(' ')[1]

      //se verifica el token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      //se obtiene los datos del usuario del token
      req.user = await User.findById(decoded.id_user).select('-password')
      
      next()
    } catch(error){
      console.log(error)
      res.status(401)
      throw new Error('Acceso no autorizado')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Acceso no autorizado, no se proporcionó un token')
  }
})

module.exports = { protect }
