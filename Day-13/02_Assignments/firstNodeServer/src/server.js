import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';

const app = express();

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json());

const studentSchema = new mongoose.Schema({
    name : { type : String, required : true, trim:true},
    course: {type : String, required : true, trim:true},
    marks: {type: Number, default : 0, min : 0, max: 100}
})

const Students = mongoose.model("Interns", studentSchema);


async function seedIfEmpty(){
    const count = await Students.countDocuments();
    if(count > 0) return ;

    await Students.insertMany([
        {name : "Akash", course : "Node.js", marks : 90},
        {name : "Yaswanth", course : "Python", marks : 89},
        {name : "Pavan", course : "CRM", marks : 99}
    ])

    console.log("Mock Data is Seeded into Student Collections");
}


app.get('/students', async (req, res)=>{
    try{
        const students = await Students.find();

        res.status(200).json(students);
    }catch(err){
        res.status(505).json({message:"Database error", error:err.message});
    }
});

app.get('/students/:id', async(req, res)=>{
    try{
        if(!mongoose.isValidObjectId(req.params.id)){
            res.status(400).json({message: "This is not a valid Id"});
        }

        const student = await Students.findById(req.params.id);

        if(!student){
            res.status(404).json({message: "Student not found"});
        }
        res.json(student);
    }catch{
        res.status(500).json({message : "Database Error", error: err.message});
    }
});


app.post("/students", async(req, res)=>{
    try{
        const {name, course, marks} = req.body;

        if (!name || !course){
            res.status(400).json( {message: 'name and course are required to create'});
        }

        const newstudent = await Students.create({
            name: name,
            course: course,
            marks: marks
        });

        res.status(201).json(newstudent);
    }catch(err){
        if(err.name === 'ValidationError'){
            res.status(400).json({message: err.message});
        }

        res.status(500).json({ message : 'Database Error', error: err.message });
    }
});


app.put('/students/:id', async(req, res)=>{
    try {
        if(!mongoose.isValidObjectId(req.params.id)){
            res.status(400).json({message : "Invalid Student Id"});
        }
        const changes = {}

        if (!req.body){
            res.status(400).json({message:"Must need payload to update record"});
        }
        if (req.body.name !== undefined) changes.name = req.body.name;
        if (req.body.course !== undefined) changes.course = req.body.course;
        if (req.body.marks !== undefined) changes.marks = req.body.marks;


        const updatedStudent = await Students.findByIdAndUpdate(req.params.id, changes, {
            new : true,
            runValidators : true,
        });

        if(!updatedStudent){
            res.status(400).json({message : "Student not found"});
        }

        res.status(201).json({message:'Student data Updated', student:updatedStudent});
    }catch(err){
        if (err.name === 'ValidationError'){
            res.status(400).json({message: err.message});
        }
        res.status(500).json({message:'Database Error', error: err.message});
    }
});


app.delete('/students/:id', async(req, res)=>{
    try{
        if(!mongoose.isValidObjectId(req.params.id)){
            res.status(400).json({message: "Invalid Student id"});
        }

        const deletedStudent = await Students.findByIdAndDelete(req.params.id);

        if(!deletedStudent){
            res.status(400).json({message: 'Student not found to delete'});
        }

        res.status(201).json({message:'Student deleted',student:deletedStudent});
    }catch(err){
        res.status(400).json({message:'Database Error', error:err.message});
    }
});




async function start(){
    try{
        await mongoose.connect(MONGO_URI);
        console.log("DataBase connected");

        await seedIfEmpty();

        app.listen(PORT, ()=>{
            console.log("Sever started Running in http://localhost:5000");
        });

    }catch(err){
        console.error(err.message);
        console.error("Could not connect to Database, Please check the Database URL");
    }
}

start()