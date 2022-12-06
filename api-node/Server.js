const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

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

    let login = await register(
        firstname,
        lastname,
      );
      res.status(200).send(login);
    }
    catch (error) {
        res.status(400).send(error);
}
});

form=(firstname,lastname) => {
    return new Promise((resolve,reject)=>{
        var sql =  "INSERT INTO register (firstname,lastname) VALUES (?,?)";
    db.query(sql,[firstname,lastname],
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

app.listen(port, () => {
    console.log(`Server Connected ${port}`)
});