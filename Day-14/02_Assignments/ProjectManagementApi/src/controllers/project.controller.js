import ProjectService from "../services/project.service.js";
import { getAuditContext } from "../utils/audit.utils.js";

const projectService = new ProjectService();


async function getProjects(req, res){
    try{
        const projects = await projectService.getProjects();
        res.status(200).json(projects);
    }catch(err){
        res.json({message:"Database Error", error:err.message});
    }
}


async function getProjectById(req, res){
    try{
        const projectId = req.params.id;
        const project = await projectService.getProjectById(projectId);
        res.status(200).json(project);
    }catch(err){
        res.json({message:"Database Error", error:err.message});
    }
}


async function createProject(req, res){
    try{
        const {projectName, managerId, ownerId} = req.body;

        const newProject = {
            projectName: projectName,
            managerId: managerId,
            ownerId: ownerId,
            createdBy: req.user.sub,
            updatedBy: req.user.sub
        };

        const project = await projectService.createProject(
            newProject,
            getAuditContext(req)
        );

        res.status(200).json(project);
    }catch(err){
        res.json({message:"Database Error", error:err.message});
    }
}


async function updateProject(req, res){
    try{
        let projectToUpdate = {};
        const projectId = req.params.id;

        if(req.body.projectName !== undefined) {
            projectToUpdate.projectName = req.body.projectName;
        }

        if(req.body.managerId !== undefined) {
            projectToUpdate.managerId = req.body.managerId;
        }

        if(req.body.ownerId !== undefined) {
            projectToUpdate.ownerId = req.body.ownerId;
        }

        projectToUpdate.updatedBy = req.user.sub;

        const updatedProject = await projectService.updateProject(
            projectId,
            projectToUpdate,
            getAuditContext(req)
        );

        res.status(200).json(updatedProject);
    }catch(err){
        res.json({error: err.message});
    }
}


async function deleteProject(req, res){
    try{
        const projectId = req.params.id;

        const deletedProject = await projectService.deleteProject(
            projectId,
            req.user.sub,
            getAuditContext(req)
        );

        res.status(200).json(deletedProject);
    }catch(err){
        res.json({message:"Database Error", error:err.message});
    }
}


export {
    getProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject
};