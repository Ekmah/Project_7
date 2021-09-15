const fs = require('fs');

const mysql = require('mysql');
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'dactylographierais',
  database: 'p7'
});
  
exports.createThread = (req, res, next) => {
  const threadObject = req.body.thread;
  console.log(threadObject)
  con.query('INSERT INTO thread SET ?', threadObject, (err, resp) => {
    console.log(resp.insertId)
    if (err){res.status(400).json({ err })}
    else {res.status(201).json({ message: 'Objet enregistré !'})}
  })
};

exports.getOneThread = (req, res, next) => {
  con.query('SELECT * FROM thread WHERE id=?', req.params.id, (err, resp) => {
    console.log(resp)
    if (err){res.status(404).json({err})}
    else {res.status(200).json(resp)}
  })
};

exports.modifyThread = (req, res, next) => {
    const threadObject = JSON.parse(req.body.thread)
    console.log(threadObject)
    let quer = ""
    for (field of Object.keys(threadObject)) {
      quer = quer.concat(`${mysql.escape(field)}=${mysql.escape(threadObject[field])}`)
    }
    con.query(
        `UPDATE thread SET ${quer} Where ID = ?`,
        [threadObject.id], (err, resp) => {
          if (err){res.status(400).json({ err })}
          else {res.status(20).json({ message: 'Objet modifié !'})}
        })
};

exports.deleteThread = (req, res, next) => {
  con.query('DELETE FROM thread WHERE id=?', req.params.id, (err, resp) => {
    console.log(resp)
    if (err){res.status(400).json({err})}
    else {res.status(200).json({ message: 'Objet supprimé !'})}
  })
};

exports.getAllThreads = (req, res, next) => {
  con.query('SELECT * FROM thread', (err, resp) => {
    if (err){res.status(400).json({err})}
    else {res.status(200).json(resp)}
  })
};