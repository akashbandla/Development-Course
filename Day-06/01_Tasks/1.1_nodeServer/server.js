require('dotenv').config(); // Add this first!
const express = require('express');
const mongoose = require('mongoose');
const locationRoutes = require('./routes/locationRoutes');

const PORT = process.env.PORT || 3000;
const DB_URI = process.env.DB_URI;

console.log(PORT)
console.log(DB_URI)

const app = express();
app.use(express.json())

app.use('/api/users', locationRoutes);

mongoose.connect(DB_URI)
   .then(() => {
     console.log('connected to MongoDB:', DB_URI);
     app.listen(PORT, () => 
        console.log(`server running on http://localhost:${PORT}`));
   })
   .catch((err)=> {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
   })