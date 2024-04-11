const express = require('express')
const router = express.Router()
const { createTask, getTasks, updateTask, deleteTask } = require('../controllers/taskControllers')
const { protect } = require('../middleware/authMiddleware')

router.post('/', protect, createTask)
router.get('/', protect, getTasks)
router.put('/:id', protect, updateTask)
router.delete('/:id', protect, deleteTask)

module.exports = router