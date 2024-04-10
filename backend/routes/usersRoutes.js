const express = require('express')
const router = express.Router()
const { createUser, loginUser, dataUser } = require('../controllers/usersControllers')
const { protect } = require('../middleware/authMiddleware')

router.post('/', createUser)
router.post('/login', loginUser)
router.get('/data', protect, dataUser)

module.exports = router