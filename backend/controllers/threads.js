const fs = require('fs');
// -----------------------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------- REQUIRE ADAPTATION FROM MONGODB TO MYSQL ------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------------------------------
const con = mysql.createConnection({
    host: 'localhost',
    user: 'user',
    password: 'password',
    database: 'sitepoint'
  });
  
exports.createThread = (req, res, next) => {
  const threadObject = JSON.parse(req.body.thread);
  delete threadObject._id;
  con.query('INSERT INTO thread SET ?', threadObject)
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
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
  const threadObject = req.file ?
    {
      ...JSON.parse(req.body.thread),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  Thread.findOne({ _id: req.params.id })
  .then(thread => {
    const filename = thread.imageUrl.split('/images/')[1];
    fs.unlink(`images/${filename}`, () =>{
      Thread.updateOne({ _id: req.params.id }, { ...threadObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet modifié !'}))
        .catch(error => res.status(400).json({ error }));
    })
  })
  .catch(error => res.status(500).json({ error }));
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