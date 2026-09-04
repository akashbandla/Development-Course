import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    projectName: { 
        type: String, 
        required: true, 
        trim:true 
    },
    projectId : { 
        type: String, 
        required: true
    },
    managerId : { 
        type: mongoose.Schema.Types.ObjectId, 
        ref:'Users', 
        required: true 
    },
    ownerId : { 
        type: mongoose.Schema.Types.ObjectId, 
        ref:'Users', 
        required: true 
    },
    createdBy : { 
        type: mongoose.Schema.Types.ObjectId, 
        ref:'Users', 
        required: true 
    },
    updatedBy : { 
        type: mongoose.Schema.Types.ObjectId, 
        ref:'Users', 
        required: true 
    },
    isDeleted: {
        type: 'Boolean',
        default: false,
    },
    deletedBy: {
        type: mongoose.Schema.Types.ObjectId || null,
        ref: 'Users',
        default: null
    }
}, {timestamps:true});

const Projects = mongoose.model("Projects", projectSchema);

export default Projects;