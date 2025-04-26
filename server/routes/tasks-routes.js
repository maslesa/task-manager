const express = require('express');
const router = express.Router();
const {postTask, fetchAllTasks, fetchImportantTasks, fetchTask, updateTask, deleteTask} = require('../controllers/tasks-controllers');
const isLoggedIn = require('../middleware/logged-in');

router.post('/post', isLoggedIn, postTask);
router.get('/', isLoggedIn, fetchAllTasks);
router.get('/important', isLoggedIn, fetchImportantTasks);
router.get('/:id', isLoggedIn, fetchTask);
router.put('/update/:id', isLoggedIn, updateTask);
router.delete('/delete/:id', isLoggedIn, deleteTask);

module.exports = router;