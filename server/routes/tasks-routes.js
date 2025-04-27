const express = require('express');
const router = express.Router();
const {postTask, fetchAllTasks, fetchImportantTasks, fetchTask, updateTask, deleteTask, completeTask, fetchCompletedTasks} = require('../controllers/tasks-controllers');
const isLoggedIn = require('../middleware/logged-in');

router.post('/post', isLoggedIn, postTask);
router.get('/', isLoggedIn, fetchAllTasks);
router.get('/important', isLoggedIn, fetchImportantTasks);
router.get('/completed', isLoggedIn, fetchCompletedTasks);
router.get('/:id', isLoggedIn, fetchTask);
router.put('/update/:id', isLoggedIn, updateTask);
router.delete('/delete/:id', isLoggedIn, deleteTask);
router.put('/set-completed/:id', isLoggedIn, completeTask);

module.exports = router;