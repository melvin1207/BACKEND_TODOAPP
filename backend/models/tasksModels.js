const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  description: {
    type: String,
    required: [true, 'Por favor ingrese una descripcion']
  },
  category:{
    type :String,
    required: [true, 'Ingrese la categoria de la tarea']
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Task', taskSchema)