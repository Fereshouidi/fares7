const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3315;
app.use(bodyParser.json());

app.use(cors());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'fares',
    password: 'feres997',
    port: 3307,
    database: 'db'
});

connection.connect( (err)=>{
    if(err){
        console.log("_______________error____________",err);
    }else{
        console.log("____________connect__________");
    }
});


app.get('/', (req , res)=>{
    res.send("api is running !!!");
});



app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // يمكنك تحديد النطاق الذي يمكن أن يصل إليه الطلبات بدلاً من *
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
  



// إنشاء مستخدم جديد
app.post('/api/passenger', (req, res) => {
    const newUser = req.body;
    let sql = 'INSERT INTO passenger SET ?';
    connection.query(sql, newUser, (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.status(201).json({ id: result.insertId, ...newUser });
    });
  });
  
  // قراءة جميع المستخدمين
  app.get('/api/passenger', (req, res) => {
    let sql = 'SELECT * FROM passenger';
    connection.query(sql, (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(results);
    });
  });
  
  // قراءة مستخدم محدد بناءً على الـID
  app.get('/api/passenger/:id', (req, res) => {
    let sql = 'SELECT * FROM passenger WHERE id = ?';
    connection.query(sql, [req.params.id], (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (result.length === 0) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.json(result[0]);
    });
  });
  
  // تحديث مستخدم محدد بناءً على الـID
  app.put('/api/passenger/:id', (req, res) => {
    const updatedUser = req.body;
    let sql = 'UPDATE passenger SET ? WHERE id = ?';
    connection.query(sql, [updatedUser, req.params.id], (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (result.affectedRows === 0) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.json({ message: 'User updated', id: req.params.id, ...updatedUser });
    });
  });
  
  // حذف مستخدم محدد بناءً على الـID
  app.delete('/api/passenger/:id', (req, res) => {
    let sql = 'DELETE FROM passenger WHERE id = ?';
    connection.query(sql, [req.params.id], (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (result.affectedRows === 0) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.json({ message: 'User deleted', id: req.params.id });
    });
  });





app.listen(port, ()=>{
    console.log(`server running on port ${port}`);
});

