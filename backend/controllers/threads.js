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
  con.query('INSERT INTO thread SET ?', threadObject, (err, resp) => {
    if (err){res.status(400).json({ err })}
    else {res.status(201).json({resp})}
  })
};

exports.getOneThread = (req, res, next) => {
  con.query(`SELECT 
            post.id as postId, 
            thread.id as threadId, 
            user.id as userId, 
            user.username, 
            post.content, 
            post.media, 
            post.is_first_post, 
            post.answer_to, 
            post.date_creation as postDateCreation, 
            thread.date_creation as threadCreationDate, 
            thread.subject 
            FROM thread 
            JOIN post on post.threadId = thread.id 
            JOIN user on user.id = post.creatorId  
            WHERE thread.id = ?`, req.params.id, (err, resp) => {
    if (err){res.status(404).json({err})}
    else {res.status(200).json(resp)}
  })
};

exports.modifyThread = (req, res, next) => {
  const threadObject = req.body.thread
  let quer = ""
  for (field of Object.keys(threadObject)) {
    if (field!="id"){
      quer = quer.concat(field,`=${mysql.escape(threadObject[field])} `)
    }
  }
  con.query(
    `UPDATE thread SET ${quer} Where ID = ?`,
    [threadObject.id], (err, resp) => {
      if (err){res.status(400).json({ err })}
      else {res.status(200).json({ message: 'Objet modifié !'})}
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
  con.query('SELECT thread.id as threadId, thread.date_creation, thread.subject, user.username, thread.creatorId FROM thread JOIN user on user.id=thread.creatorId', (err, resp) => {
    if (err){res.status(400).json({err})}
    else {res.status(200).json(resp)}
  })
};