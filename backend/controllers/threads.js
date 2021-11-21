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
            thread.subject, 
            thread.creatorId as threadcreatorId
            FROM thread 
            JOIN post on post.threadId = thread.id 
            JOIN user on user.id = post.creatorId  
            WHERE thread.id = ? ORDER BY post.date_creation`, req.params.id, (err, resp) => {
    if (err){res.status(404).json({err})}
    else {res.status(200).json(resp)}
  })
};

exports.modifyThread = (req, res, next) => {
  con.query('SELECT * FROM thread WHERE id=?', req.params.threadId, (err, resp) => {
    if (req.params.userId == resp[0].creatorId || req.params.role == "modo") {
      const threadObject = req.body.thread
      let quer = ""
      for (field of Object.keys(threadObject)) {
        if (field!="id"){
          quer = quer.concat(field,`=${mysql.escape(threadObject[field])} `)
        }
      }
      console.log(quer, threadObject, req.params.threadId)
      con.query(
        `UPDATE thread SET ${quer} Where ID = ?`,
        req.params.threadId, (err, resp) => {
          if (err){res.status(400).json({ err })}
          else {res.status(201).json({ message: 'Objet modifié !'})}
        })
    } else {
      res.status(400).json({message: "You are neither the creator or the moderator of this post."})
    }
  })
};

exports.deleteThread = (req, res, next) => {
  con.query('SELECT * FROM thread WHERE id=?', req.params.threadId, (err, resp) => {
    console.log("thread:", resp)
    if (req.params.userId == resp[0].creatorId || req.params.role == "modo") {
      con.query('DELETE FROM thread WHERE id=?', req.params.threadId, (err, resp) => {
        console.log(resp)
        if (err){res.status(400).json({err})}
        else {res.status(200).json({ message: 'Objet supprimé !'})}
      })
    } else {
      res.status(400).json({message: "You are neither the creator or the moderator of this thread."})
    }
  })
};

exports.getAllThreads = (req, res, next) => {
  con.query('SELECT thread.id as threadId, thread.date_creation, thread.subject, user.username, thread.creatorId FROM thread JOIN user on user.id=thread.creatorId ORDER BY thread.date_creation DESC', (err, resp) => {
    if (err){res.status(400).json({err})}
    else {res.status(200).json(resp)}
  })
};