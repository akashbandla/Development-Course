import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    taskName: { 
        type: String, 
        required: true,
         trim:true 
    },
    taskId : { 
        type: String, 
        required: true
    },
    projectId : { 
        type: mongoose.Schema.Types.ObjectId, 
        ref:'Projects', 
        required: true 
    },
    userId : { 
        type: mongoose.Schema.Types.ObjectId, 
        ref:'Users',
        required: true 
    },
    isDeleted: {
        type: 'Boolean',
        default: false,
    },
    deletedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        default: null
    }
}, {timestamps:true});

const Tasks = mongoose.model("Tasks", taskSchema);

export default Tasks;