const fs = require('fs');
// -----------------------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------- REQUIRE ADAPTATION FROM MONGODB TO MYSQL ------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------------------------------
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
    if (err){res.status(400).json({ err })}
    else {
        console.log(resp.insertId);
        res.status(201).json({ message: 'Objet enregistré !'})}
  })
};

exports.getOnePost = (req, res, next) => {
  Post.findOne({
    _id: req.params.id
  }).then(
    (post) => {
      res.status(200).json(post);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
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
  Post.findOne({ _id: req.params.id })
  .then(post => {
    const filename = post.imageUrl.split('/images/')[1];
    fs.unlink(`images/${filename}`, () => {
      Post.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
        .catch(error => res.status(400).json({ error }));
    });
  })
  .catch(error => res.status(500).json({ error }));
};

exports.getAllPosts = (req, res, next) => {
    con.query('SELECT * FROM post').then(
    (posts) => {
      res.status(200).json(posts);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};