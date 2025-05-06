const Task = require('../models/Task');

const postTask = async(req, res) => {
    try {
        const userId = req.userInfo.id;
        const {title, description, deadline, priority} = req.body;

        const newTask = new Task({
            title: title,
            description: description,
            deadline: deadline,
            priority: priority,
            uploadedBy: userId
        })

        await newTask.save();

        res.status(200).json({
            success: true,
            message: 'Task has uploaded successfully',
            data: newTask
        })

    } catch (error) {
        console.log('Something went wrong');
        res.status(500).json({
            success: false,
            message: 'something went wrong'
        })
    }
}

const fetchAllTasks = async(req, res) => {
    try {
        const userId = req.userInfo.id;
        const userTasks = await Task.find({uploadedBy: userId});        
        if(userTasks.length > 0){
            res.status(200).json({
                success: true,
                message: "User's tasks found successfully",
                data: userTasks
            })
        }else{
            res.status(200).json({
                success: true,
                message: "No tasks found"
            })
        }
    } catch (error) {
        console.log('Something went wrong');
        res.status(500).json({
            success: false,
            message: 'something went wrong'
        })
    }
}

const fetchImportantTasks = async(req, res) => {
    try {
        const userId = req.userInfo.id;
        const importantTasks = await Task.find({
            uploadedBy: userId,
            priority: { $in : ['high', 'very high'] }
        });

        if(importantTasks.length > 0){
            res.status(200).json({
                success: true,
                message: 'Important tasks found successfully',
                data: importantTasks
            })
        }else{
            res.status(200).json({
                success: true,
                message: 'No important tasks found',
            })
        }

    } catch (error) {
        console.log('Something went wrong');
        res.status(500).json({
            success: false,
            message: 'something went wrong'
        })
    }
}

const fetchTask = async(req, res) => {
    try {
        const taskId = req.params.id;
        const task = await Task.findById(taskId);
        if(!task){
            res.status(404).json({
                success: false,
                message: "Task with that id is not found"
            })
        }else{
            res.status(200).json({
                success: true,
                message: "Task found successfully",
                data: task
            })
        }
    } catch (error) {
        console.log('Something went wrong');
        res.status(500).json({
            success: false,
            message: 'something went wrong'
        })
    }
}

const updateTask = async(req, res) => {
    try {
        const taskId = req.params.id;
        const userInput = req.body;
        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            userInput,
            {new: true}
        )
        if(!updatedTask){
            res.status(404).json({
                success: false,
                message: "Task with that id is not found"
            })
        }else{
            res.status(200).json({
                success: true,
                message: "Task updated successfully",
                data: updatedTask
            })
        }
    } catch (error) {
        console.log('Something went wrong');
        res.status(500).json({
            success: false,
            message: 'something went wrong'
        })
    }
}

const deleteTask = async(req, res) => {
    try {
        const taskId = req.params.id;
        const deletedTask = await Task.findByIdAndDelete(taskId);
        if(!deletedTask){
            res.status(404).json({
                success: false,
                message: "Task with that id is not found"
            })
        }else{
            res.status(200).json({
                success: true,
                message: "Task deleted successfully",
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'something went wrong'
        })
    }
}

const completeTask = async(req, res) => {
    try {
        const taskId = req.params.id;
        const task = await Task.findById(taskId);

        if(!task){
            return res.status(404).json({
                success: false,
                message: 'task with that id not found'
            })
        }

        let status = 'uncompleted';
        if(task.status === 'uncompleted'){
            status = 'completed';
        }
        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            {status : status},
            {new : true}
        )
        if(!updatedTask){
            return res.status(404).json({
                success: false,
                message: 'task with that id not found'
            })
        }
        res.status(200).json({
            success: true,
            message: 'Task status setted to COMPLETED',
            data: updatedTask
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'something went wrong'
        })
    }
}

const fetchCompletedTasks = async(req, res) => {
    try {
        const userId = req.userInfo.id;
        const completedTasks = await Task.find({
            uploadedBy: userId,
            status: 'completed'
        });
        
        if(completedTasks.length === 0){
            return res.status(200).json({
                success: true,
                message: '0 completed tasks found',
                data: []
            })
        }
        res.status(200).json({
            success: true,
            message: 'completed tasks found',
            data: completedTasks
        })
    } catch (error) {        
        res.status(500).json({
            success: false,
            message: 'something went wrong',
        })
    }
}

const fetchUncompletedTasks = async(req, res) => {
    try {
        const userId = req.userInfo.id;
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const uncompletedTasks = await Task.find({
            status: 'uncompleted',
            uploadedBy: userId,
            deadline: { $lt: today }
        });

        if(uncompletedTasks.length === 0){
            return res.status(200).json({
                success: true,
                message: 'there is no uncompleted tasks',
            });
        }

        res.status(200).json({
            success: true,
            message: 'uncompleted tasks found successfully',
            tasks: uncompletedTasks
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'something went wrong',
        })
    }
}

const fetchTodayTasks = async(req, res) => {
    try {
        const userId = req.userInfo.id;

        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        const todayTasks = await Task.find({
            uploadedBy: userId,
            deadline: {
                $gte: startOfDay,
                $lt: endOfDay
            }
        });

        if(todayTasks.length === 0){
            return res.status(200).json({
                success: true,
                message: 'there is no today tasks',
            });
        }

        res.status(200).json({
            success: true,
            message: 'uncompleted tasks found successfully',
            tasks: todayTasks
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'something went wrong',
        })
    }
}

module.exports = {
    postTask,
    fetchAllTasks,
    fetchImportantTasks,
    fetchTask,
    updateTask,
    deleteTask,
    completeTask,
    fetchCompletedTasks,
    fetchUncompletedTasks,
    fetchTodayTasks
}