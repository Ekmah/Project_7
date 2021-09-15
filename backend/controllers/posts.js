const fs = require('fs');

const mysql = require('mysql');
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'dactylographierais',
  database: 'p7'
});

exports.createPost = (req, res, next) => {
  const postObject = req.body.post;
  console.log(postObject)
  con.query('INSERT INTO post SET ?', postObject, (err, resp) => {
    console.log(resp.insertId)
    if (err){res.status(400).json({ err })}
    else {res.status(201).json({ message: 'Objet enregistré !'})}
  })
};

exports.getOnePost = (req, res, next) => {
  con.query('SELECT * FROM post WHERE id=?', req.params.id, (err, resp) => {
    console.log(resp)
    if (err){res.status(404).json({err})}
    else {res.status(200).json(resp)}
  })
};

exports.modifyPost = (req, res, next) => {
    const postObject = JSON.parse(req.body.post)
    console.log(postObject)
    let quer = ""
    for (field of Object.keys(postObject)) {
      quer = quer.concat(`${mysql.escape(field)}=${mysql.escape(postObject[field])}`)
    }
    con.query(
        `UPDATE post SET ${quer} Where ID = ?`,
        [postObject.id], (err, resp) => {
          if (err){res.status(400).json({ err })}
          else {res.status(20).json({ message: 'Objet modifié !'})}
        })
};

exports.deletePost = (req, res, next) => {
  con.query('DELETE FROM post WHERE id=?', req.params.id, (err, resp) => {
    console.log(resp)
    if (err){res.status(400).json({err})}
    else {res.status(200).json({ message: 'Objet supprimé !'})}
  })
};

exports.getAllPosts = (req, res, next) => {
  con.query('SELECT * FROM post', (err, resp) => {
    if (err){res.status(400).json({err})}
    else {res.status(200).json(resp)}
  })
};