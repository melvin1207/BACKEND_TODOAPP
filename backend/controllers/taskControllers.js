const asyncHandler = require('express-async-handler')
const Task = require('../models/tasksModels')

//crear una tarea
const createTask = asyncHandler(async (req, res) => {
  if(!req.body.description){
    res.status(400)
    throw new Error("Faltan datos")
  }

  const task = await Task.create({
    description: req.body.description,
    user: req.user.id
  })

  res.status(201).json(task)
})

//obtener las tareas
const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ user:req.user.id })
  res.status(200).json(tasks)
})

//actualizar una tarea
const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id)

  if (!task) {
      res.status(400)
      throw new Error('Esa tarea no existe')
  }

  //nos aseguramos que la tarea pertenezca al usuario logeado, es decir el del token
  if (task.user.toString() !== req.user.id) {
      res.status(401)
      throw new Error('Usuario no autorizado')
  } else {
      const taskUpdated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true })

      res.status(200).json(taskUpdated)
  }
})

//eliminar una tarea
const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id)

  if (!task) {
      res.status(400)
      throw new Error('Esa tarea no existe')
  }

  //nos aseguramos que la tarea pertenezca al usuario logeado, es decir el del token
  if (task.user.toString() !== req.user.id) {
      res.status(401)
      throw new Error('Usuario no autorizado')
  } else {
      await Task.deleteOne(task)
      //const tareaDeleted = await Tarea.findByIdAndDelete(req.params.id)

      res.status(200).json({ id: req.params.id })
  }
})

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask
}