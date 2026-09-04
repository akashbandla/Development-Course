/* =====================================================================
   MY FIRST API  —  everything is in this ONE file.
   Read it from top to bottom, like a story. 7 small steps.
   =====================================================================
   WHAT IS AN API?
   It is a waiter in a restaurant.
     You (the browser)  →  ask the waiter  →  waiter brings food (data)
   You ask by opening a URL. The waiter answers with data in JSON format.

   WHAT IS JSON?
   It is just a JavaScript object written as text:
     { "name": "Rahul", "marks": 85 }

   WHERE IS THE DATA KEPT?
   In a DATABASE — a program whose only job is to remember things, even
   after your server stops. We use MongoDB.
   ===================================================================== */

/* ---------------------------------------------------------------------
   STEP 1 — Bring in our two tools
   ---------------------------------------------------------------------
   "import" means "bring this tool into my file".
     express  = makes building a server easy
     mongoose = makes talking to MongoDB easy

   You will see older tutorials write this instead:
       const express = require('express');
   That is the OLD style (CommonJS). We use `import`, the modern standard
   (ES Modules) — the same syntax the browser uses.

   ⚠️ For `import` to work, package.json must say  "type": "module".
      Without that line Node reads the file as CommonJS and you get
      "Cannot use import statement outside a module".
--------------------------------------------------------------------- */
import express from 'express';
import mongoose from 'mongoose';
// import 'dotenv/config';

const app = express(); // "app" is our server. We will add routes to it.
const PORT = 5000; // the door number where our server waits

// Where is the database? "mongodb://127.0.0.1:27017" is MongoDB running on
// your own computer. "/schooldb" is the name of our database — MongoDB
// creates it automatically the first time we save something.
const MONGO_URI = process.env.MONGO_URI;

/* ---------------------------------------------------------------------
   STEP 2 — One important line
   ---------------------------------------------------------------------
   When someone SENDS us data (like a new student's name), it arrives as
   plain text. This line converts that text into a JavaScript object,
   so we can use "req.body".

   ⚠️ If you forget this line, req.body will be undefined. Very common bug!
--------------------------------------------------------------------- */
app.use(express.json());

/* ---------------------------------------------------------------------
   STEP 3 — Describe our data (the "schema") and make a Model
   ---------------------------------------------------------------------
   A SCHEMA is a shape: "every student has a name, a course and marks".
   Mongoose checks this shape for you, so bad data never reaches the DB.

   A MODEL is the thing you actually use. Think of it as the door to one
   collection (a collection = a table = a drawer full of documents).
   `mongoose.model('Student', ...)` creates a collection called "students".

   👉 Unlike our old array, MongoDB gives every document an id ITSELF.
      It is called _id and it looks like "6712f0a9c3b4e21d8c9a1f47".
      It is TEXT, not a number — that matters in STEP 5.
--------------------------------------------------------------------- */
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  course: { type: String, required: true, trim: true },
  marks: { type: Number, default: 0, min: 0, max: 100 },
});

const Student = mongoose.model('Student', studentSchema);

/* ---------------------------------------------------------------------
   STEP 4 — Put 3 students in, but ONLY the very first time
   ---------------------------------------------------------------------
   The database remembers data forever. So if we inserted these students
   on every restart, we would soon have hundreds of copies.
   countDocuments() asks "how many students are in there?" — we only fill
   the collection when the answer is 0.

   "await" means "wait for this to finish before going to the next line".
   Talking to a database takes time, so almost everything below is awaited.
--------------------------------------------------------------------- */
async function seedIfEmpty() {
  const count = await Student.countDocuments();
  if (count > 0) return; // already has data → leave it alone

  await Student.insertMany([
    { name: 'Rahul', course: 'Node.js', marks: 85 },
    { name: 'Priya', course: 'React', marks: 92 },
    { name: 'Arjun', course: 'Python', marks: 78 },
  ]);
  console.log('Added 3 starter students 🌱');
}

/* =====================================================================
   STEP 5 — THE 5 CRUD ROUTES
   =====================================================================
   CRUD = the 4 things we do with data:

     C = Create  (add)      →  POST
     R = Read    (see)      →  GET
     U = Update  (change)   →  PUT
     D = Delete  (remove)   →  DELETE

   A route has 2 parts:
     app.get('/students', function (req, res) { ... })
         ▲        ▲                  ▲    ▲
         │        │                  │    └── res = what we SEND BACK
         │        │                  └─────── req = what we RECEIVED
         │        └────────────────────────── the URL
         └─────────────────────────────────── the method

   Every route below is `async` because the database answers slowly.
   And every one is wrapped in try/catch: if the database is down, or the
   id is not a real _id, we must answer with an error instead of hanging.
===================================================================== */

/* ---- 5.1  READ ALL  ---------------------------------------------------
   Open in browser:  http://localhost:5000/students

   Student.find() with no argument means "give me everything".
----------------------------------------------------------------------- */
app.get('/students', async (req, res) => {
  try {
    const students = await Student.find();
    // res.json(...) sends data back and finishes the request.
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: 'Database error', error: err.message });
  }
});

/* ---- 5.2  READ ONE  ---------------------------------------------------
   Open in browser:  http://localhost:5000/students/<paste an _id here>

   ":id" is a blank space in the URL. Whatever the user types there
   comes to us inside  req.params.id

   ⚠️ Old array version: we wrote Number(req.params.id).
      MongoDB version:   DON'T. _id is text like "6712f0a9c3b4e21d8c9a1f47".
      But it must be a VALID id, so we check it first — otherwise Mongoose
      throws a CastError and the user gets a confusing 500.
----------------------------------------------------------------------- */
app.get('/students/:id', async (req, res) => {
  try {
    // isValidObjectId asks: "could this text ever be a real _id?"
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'That is not a valid id' });
    }

    // findById returns the document, or null if nothing matched.
    const student = await Student.findById(req.params.id);

    if (!student) {
      // 404 means "not found". We must "return" so the code below does not run.
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json(student);
  } catch (err) {
    res.status(500).json({ message: 'Database error', error: err.message });
  }
});

/* ---- 5.3  CREATE  -----------------------------------------------------
   You CANNOT test this in the browser address bar (that only does GET).
   Use Postman, Thunder Client, or the requests.http file. See README.

   Send this body:   { "name": "Sneha", "course": "Java", "marks": 88 }
----------------------------------------------------------------------- */
app.post('/students', async (req, res) => {
  try {
    // The data the user sent is in req.body (thanks to STEP 2).
    const { name, course, marks } = req.body;

    // Always check the data. Never trust the user!
    // (The schema checks it too — but a 400 with a clear message is kinder
    //  than letting Mongoose throw.)
    if (!name || !course) {
      // 400 means "you sent something wrong".
      return res.status(400).json({ message: 'name and course are required' });
    }

    // Notice we do NOT set an id. MongoDB does that for us.
    // We also list the fields one by one instead of passing req.body straight
    // in — that stops a user sneaking in extra fields we never asked for.
    const newStudent = await Student.create({
      name: name,
      course: course,
      marks: marks ?? 0, // if marks was not sent, use 0
    });

    // 201 means "created". Use 201 (not 200) after a successful POST.
    res.status(201).json(newStudent);
  } catch (err) {
    // A schema rule was broken (e.g. marks: 150) → that is the user's fault.
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: 'Database error', error: err.message });
  }
});

/* ---- 5.4  UPDATE  -----------------------------------------------------
   Change an existing student.  PUT http://localhost:5000/students/<_id>

   findByIdAndUpdate does find + change + save in ONE trip to the database.
     { new: true }          → give me back the NEW version, not the old one
     { runValidators: true} → check the schema rules on updates too
                              (Mongoose skips them by default — surprising!)
----------------------------------------------------------------------- */
app.put('/students/:id', async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'That is not a valid id' });
    }

    // Change only the fields the user actually sent.
    const changes = {};
    if (req.body.name !== undefined) changes.name = req.body.name;
    if (req.body.course !== undefined) changes.course = req.body.course;
    if (req.body.marks !== undefined) changes.marks = req.body.marks;

    const student = await Student.findByIdAndUpdate(req.params.id, changes, {
      new: true,
      runValidators: true,
    });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json(student);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: 'Database error', error: err.message });
  }
});

/* ---- 5.5  DELETE  -----------------------------------------------------
   Remove a student.  DELETE http://localhost:5000/students/<_id>

   findByIdAndDelete returns the document it deleted, or null if the id
   did not exist — which is exactly what we need to decide 200 vs 404.
----------------------------------------------------------------------- */
app.delete('/students/:id', async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'That is not a valid id' });
    }

    const deleted = await Student.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json({ message: 'Student deleted', student: deleted });
  } catch (err) {
    res.status(500).json({ message: 'Database error', error: err.message });
  }
});

/* ---------------------------------------------------------------------
   STEP 6 — A welcome page, so "/" is not empty
--------------------------------------------------------------------- */
app.get('/', (req, res) => {
  res.send('Server is running! Now open http://localhost:5000/students');
});

/* ---------------------------------------------------------------------
   STEP 7 — Connect to the database, THEN start the server
   ---------------------------------------------------------------------
   Order matters. If we started listening first, a request could arrive
   before the database was ready and crash.

   So: connect → seed → listen. If the connection fails we print a helpful
   message and stop, instead of running a server that cannot answer anything.

   listen() opens the door and waits for requests, forever.
   Stop the server in the terminal with:  Ctrl + C
--------------------------------------------------------------------- */
async function start() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB ✅');

    await seedIfEmpty();

    app.listen(PORT, () => {
      console.log('Server started ✅');
      console.log('Open this link: http://localhost:' + PORT + '/students');
    });
  } catch (err) {
    console.error('❌ Could not connect to MongoDB.');
    console.error('   Is MongoDB running? Is MONGO_URI correct?');
    console.error('   ' + err.message);
    process.exit(1); // stop the program with an "error" exit code
  }
}

start();
