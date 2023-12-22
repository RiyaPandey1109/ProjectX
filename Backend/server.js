const express = require('express');
const cors=require("cors");
const mysql = require('mysql2');
const app=express();
app.use(express.urlencoded({extended :true}));

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'projectx',
    password:'XDE@123'
});

db.connect((err) => {
    if(err){

        console.error('Error connnection ',err);
        return;

    }
    console.log('Connected to MysSQL');
})

app.get('/', (req, res) => {
    res.send('Hello from Backend');
  });
  
app.get('/create',(req, res)=>{
    let ={ username , Email , birthday ,password}= req.query
    res.send('Standard get response . Welcome  ${username} ');
})
app.post('/create' ,(req, res) =>{
    const {username ,email ,birthday ,password ,confirmPassword} = req.body;
     if (!username || !email || !password || password !== confirmPassword) {
        return res.status(400).json({ error: 'Invalid form data' });
     }

    const sql = 'INSERT INTO User (username, email, birthday, password) VALUES (?, ?, ?, ?)';
    db.query(sql, [username, email, birthday, password], (err, result) => {
         if (err) {
             console.error('Error creating a user', err);
             return res.status(500).json({ error: 'Error creating user. Please try again.' });
         }
        console.log('User created successfully');
        return res.status(200).json({ success: true }); 
        });
});




const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
