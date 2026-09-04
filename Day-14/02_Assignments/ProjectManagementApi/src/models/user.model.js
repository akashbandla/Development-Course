import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : { 
        type:'String', 
        required: true, 
        trim: true
    },
    userId : { 
        type: 'String', 
        required: true,
        unique: true
    },
    email : { 
        type: 'String', 
        required: true,
        unique: true
    },
    role : { 
        type: 'String', 
        required: true, 
        trim: true
    },
    experience: { 
        type: 'String', 
        required: true, 
        trim: true
    },
    password: { 
        type:'String', 
        required:true, 
        trim: true,
        select: false
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

},{timestamps:true});

const Users = mongoose.model("Users", userSchema);

export default Users;