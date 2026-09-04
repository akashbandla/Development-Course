import TaskService from "../services/task.service.js";
import { getAuditContext } from "../utils/audit.utils.js";

const taskService = new TaskService();


async function getTasks(req, res){
    try{
        const tasks = await taskService.getTasks();
        res.status(200).json(tasks);
    }catch(err){
        res.json({message:"Database Error", error:err.message});
    }
}


async function getTaskById(req, res){
    try{
        const taskId = req.params.id;

        if (!taskId) {
            throw new Error("taskId required to get a record By Id");
        }

        const task = await taskService.getTaskById(taskId);
        res.status(200).json(task);
    }catch(err){
        res.json({message:"Database Error", error:err.message});
    }
}


async function createTask(req, res){
    try{
        const {taskName, projectId, userId} = req.body;

        const newTask = {
            taskName: taskName,
            projectId: projectId,
            userId: userId
        };

        const task = await taskService.createTask(
            newTask,
            getAuditContext(req)
        );

        res.status(201).json(task);
    }catch(err){
        res.status(500).json({
            message:"Database Error",
            error:err.message
        });
    }
}


async function updateTask(req, res){
    try{
        let taskToUpdate = {};
        const taskId = req.params.id;

        if(req.body.taskName !== undefined) {
            taskToUpdate.taskName = req.body.taskName;
        }

        if(req.body.projectId !== undefined) {
            taskToUpdate.projectId = req.body.projectId;
        }

        if(req.body.userId !== undefined) {
            taskToUpdate.userId = req.body.userId;
        }

        const updatedTask = await taskService.updateTask(
            taskId,
            taskToUpdate,
            getAuditContext(req)
        );

        res.status(200).json(updatedTask);
    }catch(err){
        res.status(500).json({
            error: err.message
        });
    }
}


async function deleteTask(req, res){
    try{
        const taskId = req.params.id;

        const deletedTask = await taskService.deleteTask(
            taskId,
            req.user.sub,
            getAuditContext(req)
        );

        res.status(200).json(deletedTask);
    }catch(err){
        res.json({
            message:"Database Error",
            error:err.message
        });
    }
}


export {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
};