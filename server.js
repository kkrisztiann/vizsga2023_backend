/* A Vizsgázó neve: Kertész Krisztián */
require('dotenv').config();
const express = require('express');
var mysql = require('mysql');
const cors = require('cors');
const app = express();

var pool = mysql.createPool({
    connectionLimit: 10,
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASS,
  database: process.env.DBNAME
});

app.use(express.urlencoded({extended: true}));


//összes koncert lekérdezés
app.get(':/table', (req,res) => {
    var table = req.params.table;
    pool.query(`SELECT * FROM ${table}`, (err,results)=>{
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(200).send(results)
        }
    })
})

//adott felhasználó jegyei
app.get(':/table/:id', (req,res) =>{
    var table = req.params.table;
    var id = req.params.id;
    pool.query(`SELECT * FROM ${table} WHERE ID = ${id}`, (err,results)=>{
        if (err) {
            res.status(500).send(err)
        }
        else{
            res.status(200).send(results)
        }
    })
})

//új jegy létrehozása

//koncert létszám adatok módosítása

//egy adott koncert törlése
app.delete(':/table/:id', (req,res) =>{
    var table = req.params.table;
    var id = req.params.id;
    pool.query(`DELETE FROM ${table} WHERE ID = ${id}` ,(err,results) =>{
        if (err) {
            res.status(500).send(err);
        }
        else{
            res.status(200).send(results);
        }
    })
})
app.listen(process.env.PORT)