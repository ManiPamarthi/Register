const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const fs = require('fs')

app.use(cors());

const port = 5000

var db = mysql.createConnection({
    host: "ManiBaji",
    user: "root",
    password: "Mani@2719",
    database: "world"
  });
  
  db.connect(function(err) {
    if (err){
    console.log("Data Base Connected ");
        }
     else 
        {
      console.log("Data Base Not Connected");
        }
  });

  app.post('/login', async (req,res) => {
    try {
        console.log(req.body)
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let gander = req.body.gander;
    let designation = req.body.designation;
    let date = req.body.date;

    let login = await register(
        firstname,
        lastname,
        gander,
        designation,
        date
      );
      res.status(200).send(login);
    }
    catch (error) {
        res.status(400).send(error);
}
});

form=(firstname,lastname,gander,designation,date) => {
    return new Promise((resolve,reject)=>{
        var sql =  "INSERT INTO register (firstname,lastname,gander,designation,date) VALUES (?,?,?,?,?)";
    db.query(sql,[firstname,lastname,gander,designation,date],
            (err,result) => {
                if (err) {
                    console.log(err)
                    return reject({ message: "unexpected error" });
                }
                else {
                    return resolve(result);
                }
            });
        
          });
        }

      const user = [
        { id:1, name: 'text1'},
        { id:2, name: 'text1'},
        { id:3, name: 'text1'},
        { id:4, name: 'text1'},
        { id:5, name: 'text1'},
        { id:6, name: 'text1'},
        { id:7, name: 'text1'},
        { id:8, name: 'text1'},
        { id:9, name: 'text1'},
        { id:10, name: 'text1'},
        { id:11, name: 'text1'},
        { id:12, name: 'text1'},
        { id:13, name: 'text1'},
        { id:14, name: 'text1'},
        { id:15, name: 'text1'},
        { id:16, name: 'text1'},
        { id:17, name: 'text1'},
        { id:18, name: 'text1'},
        { id:19, name: 'text1'},
        { id:20, name: 'text1'},
      ];

  app.get('/user', (req,res) => {
    const page = req.query.page;
    const limit = req.query.limit;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const result = user.slice(startIndex, endIndex);
    res.json(result);
  });

  const result = {};

  if(endIndex < user.length) {
    result.next = {
      page: page + 1,
      limit: limit,
    };
  }

  if(startIndex > 0){
    result.previous = {
      page: page -1,
      limit: limit,
    };
  }

  result.results = user.slice(startIndex, endIndex);
  res.json(result);

app.listen(port, () => {
    console.log(`Server Connected ${port}`)
});