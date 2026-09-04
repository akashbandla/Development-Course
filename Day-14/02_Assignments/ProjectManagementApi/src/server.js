import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import 'dotenv/config';

import userRoutes from './routes/user.routes.js';
import projectRoutes from './routes/project.routes.js';
import taskRoutes from './routes/task.routes.js';
import authRoutes from './routes/auth.routes.js';
import auditLogRoutes from "./routes/auditLog.routes.js";

import { authenticate } from './middleware/auth.middleware.js';


const app = express()

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json());
app.use(cookieParser())

app.use('/api/auth', authRoutes);

app.use(authenticate);

app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

app.use("/api/audit-logs", auditLogRoutes);



app.get('/', async(req, res)=>{
    res.json("Hello!, welcome to Project Tracker API");
})

async function start(){
    try{
        await mongoose.connect(MONGO_URI);
        console.log("Database connected successfully!");

        app.listen(PORT, ()=>{
            console.log("Server started");
            console.log("You can acess the server at http://localhost:3000/")
        })
    }catch{
        console.log("Failed to connect to database");
        console.log("Please check your Database connection string");
    }
}

start()