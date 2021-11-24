const fs = require('fs');

const mysql = require('mysql');
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'dactylographierais',
  database: 'p7'
});

exports.createPost = (req, res, next) => {
  const postObject = req.body;
  if (req.file) {
    postObject["media"] = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } else {
    delete postObject.image
  }
  console.log(postObject)
  con.query('INSERT INTO post SET ?', postObject, (err, resp) => {
    // console.log(resp)
    if (err){res.status(500).json({ err })}
    else {res.status(201).json({ message: 'Objet enregistré !'})}
  })
};

exports.getOnePost = (req, res, next) => {
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
            FROM post 
            JOIN thread on thread.id = post.threadId 
            JOIN user on user.id = post.creatorId 
            WHERE post.id=?`, req.params.id, (err, resp) => {
    // console.log("", resp)
    if (err){res.status(500).json({err})}
    else {res.status(200).json(resp)}
  })
};

exports.getPostsofThread = (req, res, next) => {
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
            FROM post 
            JOIN thread on thread.id = post.threadId 
            JOIN user on user.id = post.creatorId 
            WHERE post.threadId=?`, req.params.id, (err, resp) => {
    // console.log(resp)
    if (err){res.status(404).json({err})}
    else {res.status(200).json(resp)}
  })
};

exports.modifyPost = (req, res, next) => {
  con.query('SELECT * FROM post WHERE id=?', req.params.postId, (err, resp) => {
    if (req.params.userId == resp[0].creatorId || req.params.role == "modo") {
      const postObject = req.body 
      console.log(req.file) 
      if (req.file) {
        postObject["media"] = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        if (resp[0].media) {
          const filename = resp[0].media.split('/images/')[1];
          fs.unlink(`images/${filename}`, () =>{
            let quer = ""
            let inc = 0
            let final_range = Object.keys(postObject).length
            for (field of Object.keys(postObject)) {
              inc += 1
              if (field!="id"){
                if (inc == final_range) {
                  quer = quer.concat(field,`=${mysql.escape(postObject[field])} `)
                } else {
                  quer = quer.concat(field,`=${mysql.escape(postObject[field])}, `)
                }
              }
            }
            console.log(quer, resp[0])
            con.query(
              `UPDATE post SET ${quer} Where id = ?`, req.params.postId, (err, resp) => {
                if (err){res.status(400).json({ err })}
                else {res.status(201).json({ message: 'Objet modifié !'})}
              })
          })
        } else {
          let quer = ""
            let inc = 0
            let final_range = Object.keys(postObject).length
            for (field of Object.keys(postObject)) {
              inc += 1
              if (field!="id"){
                if (inc == final_range) {
                  quer = quer.concat(field,`=${mysql.escape(postObject[field])} `)
                } else {
                  quer = quer.concat(field,`=${mysql.escape(postObject[field])}, `)
                }
              }
            }
            console.log(quer, resp[0]) 
            con.query(
              `UPDATE post SET ${quer} Where id = ?`, req.params.postId, (err, resp) => {
                if (err){res.status(400).json({ err })}
                else {res.status(201).json({ message: 'Objet modifié !'})}
              })
        }
      } else {
          delete postObject.image
          delete postObject.id
          let quer = ""
          let inc = 0
          let final_range = Object.keys(postObject).length
          for (field of Object.keys(postObject)) {
            inc += 1
            if (field!="id"){
              if (inc == final_range) {
                quer = quer.concat(field,`=${mysql.escape(postObject[field])} `)
              } else {
                quer = quer.concat(field,`=${mysql.escape(postObject[field])}, `)
              }
            }
          }
          console.log(quer, resp[0])
          con.query(
            `UPDATE post SET ${quer} Where id = ?`, parseInt(req.params.postId), (err, resp) => {
              if (err){res.status(400).json({ err })}
              else {res.status(201).json({ message: 'Objet modifié !'})}
            })
      }
    } else {
        res.status(400).json({message: "You are neither the creator or the moderator of this post."})
      }
  })
};

exports.deletePost = (req, res, next) => {
  con.query('SELECT * FROM post WHERE id=?', req.params.postId, (err, resp) => {
    console.log("post:", resp)
    if (req.params.userId == resp[0].creatorId || req.params.role == "modo") {
      if (resp[0].media) {
        const filename = resp[0].media.split('/images/')[1];
        fs.unlink(`images/${filename}`, () =>{
          con.query('DELETE FROM post WHERE id=?', req.params.postId, (err, resp) => {
            console.log(resp)
            if (err){res.status(400).json({err})}
            else {res.status(200).json({ message: 'Objet supprimé !'})}
          })
        })
      } else {
        con.query('DELETE FROM post WHERE id=?', req.params.postId, (err, resp) => {
          console.log(resp)
          if (err){res.status(400).json({err})}
          else {res.status(200).json({ message: 'Objet supprimé !'})}
        })
      } 
    } else {
      res.status(400).json({message: "You are neither the creator or the moderator of this post."})
    }
  })
};

exports.getAllPosts = (req, res, next) => {
  con.query('SELECT * FROM post', (err, resp) => {
    if (err){res.status(400).json({err})}
    else {res.status(200).json(resp)}
  })
};

exports.getAllNewPosts = (req, res, next) => {
  con.query(`SELECT post.id as postId, thread.id as threadId, user.id as userId, user.username, post.content, 
  post.media, post.is_first_post, post.answer_to, post.date_creation as postDateCreation, 
  thread.date_creation as threadCreationDate, thread.subject 
  FROM post JOIN thread on thread.id = post.threadId JOIN user on user.id = post.creatorId 
  ORDER BY post.date_creation DESC LIMIT 0, 10`, (err, resp) => {
    if (err){res.status(400).json({err})}
    else {res.status(200).json(resp)}
  })
};
// `SELECT * FROM post ORDER BY date_creation DESC LIMIT 0, 10`

// SELECT 
//             post.id as postId, 
//             thread.id as threadId, 
//             user.id as userId, 
//             user.username,
//             post.content, 
//             post.media, 
//             post.is_first_post, 
//             post.answer_to, 
//             post.date_creation as postDateCreation, 
//             thread.date_creation as threadCreationDate, 
//             thread.subject 
//             FROM post 
//             JOIN thread on thread.id = post.threadId 
//             JOIN user on user.id = post.creatorId 
//             ORDER BY date_creation 
//             DESC 
//             LIMIT 0, 10