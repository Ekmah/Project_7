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
  Thread.findOne({
    _id: req.params.id
  }).then(
    (thread) => {
      res.status(200).json(thread);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
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
  Thread.findOne({ _id: req.params.id })
  .then(thread => {
    const filename = thread.imageUrl.split('/images/')[1];
    fs.unlink(`images/${filename}`, () => {
      Thread.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
        .catch(error => res.status(400).json({ error }));
    });
  })
  .catch(error => res.status(500).json({ error }));
};

exports.getAllThreads = (req, res, next) => {
    con.query('SELECT * FROM thread').then(
    (threads) => {
      res.status(200).json(threads);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};