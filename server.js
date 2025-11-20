// ----Task 6----
const express = require('express');
const app = express();                              

app.get('/welcome', (req, res) => {
    res.json({message : "Welcome to your first API 🚀"})
})

app.get("/greet", (req, res) => {
    const name = req.query.name || "Guest";
    res.json({message : `Hello, ${name}`})
})    

app.get("/student/:name", (req, res) => {
    const studentName = req.params.name;
    res.json({student : studentName , status : "record fetched successfully"})
})

app.listen(3000, () =>{
    console.log('Server is running on port 3000');
})  