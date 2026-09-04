
import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';

const app = express();

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json());


// ============================================================
// 1. MONGOOSE SCHEMA & MODEL
// ============================================================

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    course: {
        type: String,
        required: true,
        trim: true
    },

    marks: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    }
});

const Students = mongoose.model("Interns", studentSchema);


// ============================================================
// 2. SEED MOCK DATA
// ============================================================

function seedIfEmpty() {

    return Students.countDocuments()
        .then(count => {

            if (count > 0) {
                return;
            }

            return Students.insertMany([
                {
                    name: "Akash",
                    course: "Node.js",
                    marks: 90
                },
                {
                    name: "Yaswanth",
                    course: "Python",
                    marks: 89
                },
                {
                    name: "Pavan",
                    course: "CRM",
                    marks: 99
                }
            ]);
        })
        .then(() => {
            console.log("Mock Data is Seeded into Student Collection");
        });
}


// ============================================================
// 3. GET ALL STUDENTS
// ============================================================

app.get('/students', (req, res) => {

    Students.find()
        .then(students => {

            res.status(200).json(students);

        })
        .catch(err => {

            res.status(500).json({
                message: "Database error",
                error: err.message
            });

        });

});


// ============================================================
// 4. GET STUDENT BY ID
// ============================================================

app.get('/students/:id', (req, res) => {

    if (!mongoose.isValidObjectId(req.params.id)) {

        return res.status(400).json({
            message: "This is not a valid Id"
        });

    }

    Students.findById(req.params.id)

        .then(student => {

            if (!student) {

                return res.status(404).json({
                    message: "Student not found"
                });

            }

            res.status(200).json(student);

        })

        .catch(err => {

            res.status(500).json({
                message: "Database Error",
                error: err.message
            });

        });

});


// ============================================================
// 5. CREATE STUDENT
// ============================================================

app.post('/students', (req, res) => {

    const {
        name,
        course,
        marks
    } = req.body;

    if (!name || !course) {

        return res.status(400).json({
            message: "name and course are required to create"
        });

    }

    Students.create({
        name: name,
        course: course,
        marks: marks
    })

        .then(newStudent => {

            res.status(201).json(newStudent);

        })

        .catch(err => {

            if (err.name === 'ValidationError') {

                return res.status(400).json({
                    message: err.message
                });

            }

            res.status(500).json({
                message: "Database Error",
                error: err.message
            });

        });

});


// ============================================================
// 6. UPDATE STUDENT
// ============================================================

app.put('/students/:id', (req, res) => {

    if (!mongoose.isValidObjectId(req.params.id)) {

        return res.status(400).json({
            message: "Invalid Student Id"
        });

    }

    const changes = {};

    if (!req.body || Object.keys(req.body).length === 0) {

        return res.status(400).json({
            message: "Must need payload to update record"
        });

    }

    if (req.body.name !== undefined) {
        changes.name = req.body.name;
    }

    if (req.body.course !== undefined) {
        changes.course = req.body.course;
    }

    if (req.body.marks !== undefined) {
        changes.marks = req.body.marks;
    }

    Students.findByIdAndUpdate(
        req.params.id,
        changes,
        {
            new: true,
            runValidators: true
        }
    )

        .then(updatedStudent => {

            if (!updatedStudent) {

                return res.status(404).json({
                    message: "Student not found"
                });

            }

            res.status(200).json({
                message: "Student data Updated",
                student: updatedStudent
            });

        })

        .catch(err => {

            if (err.name === 'ValidationError') {

                return res.status(400).json({
                    message: err.message
                });

            }

            res.status(500).json({
                message: "Database Error",
                error: err.message
            });

        });

});


// ============================================================
// 7. DELETE STUDENT
// ============================================================

app.delete('/students/:id', (req, res) => {

    if (!mongoose.isValidObjectId(req.params.id)) {

        return res.status(400).json({
            message: "Invalid Student id"
        });

    }

    Students.findByIdAndDelete(req.params.id)

        .then(deletedStudent => {

            if (!deletedStudent) {

                return res.status(404).json({
                    message: "Student not found to delete"
                });

            }

            res.status(200).json({
                message: "Student deleted",
                student: deletedStudent
            });

        })

        .catch(err => {

            res.status(500).json({
                message: "Database Error",
                error: err.message
            });

        });

});


// ============================================================
// 8. START SERVER
// ============================================================

function start() {

    mongoose.connect(MONGO_URI)

        .then(() => {

            console.log("Database connected");

            return seedIfEmpty();

        })

        .then(() => {

            app.listen(PORT, () => {

                console.log(
                    `Server started running at http://localhost:${PORT}`
                );

            });

        })

        .catch(err => {

            console.error(err.message);

            console.error(
                "Could not connect to Database, Please check the Database URL"
            );

        });

}

start();
