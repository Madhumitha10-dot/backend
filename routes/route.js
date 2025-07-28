const express =require("express")
const router = express.Router()
router.use(express.json())
const { getTasks, singleTasks,createTask, updateTask, deleteTask} = require('../controller/controller')

router.get('/', getTasks)
router.get('/:id', singleTasks)
router.post('/', createTask)
router.put('/:id', updateTask)
router.delete('/:id', deleteTask)

module.exports = {router}