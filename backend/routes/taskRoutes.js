const express = require('express');
const { createTask, getTasks, deleteTask } = require('../controllers/taskController');
const {updateTask} = require('../controllers/taskController')
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.use(authMiddleware);
router.post('/', createTask);
router.get('/', getTasks);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);
router.put(':id', authMiddleware,updateTask);


module.exports = router;
