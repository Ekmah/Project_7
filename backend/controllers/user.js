const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const mysql = require('mysql');
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'dactylographierais',
  database: 'p7'
});
exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
    const userObject = {'username':req.body.username, 'email_adress':req.body.email_adress, 'password':hash}
    con.query('INSERT INTO user SET ?', userObject, (err, resp) => {
      console.log(resp.insertId)
      if (err){res.status(400).json({ err })}
      else {res.status(201).json({ message: 'Utilisateur créé !'})}
    })
  })
};
exports.login = (req, res, next) => {
  con.query('SELECT * FROM user WHERE email_adress=?', req.body.email_adress, (err, user) => {
    if (!user) {
      return res.status(401).json({err});
    }
    bcrypt.compare(req.body.password, user[0].password)
    .then(valid => {
      if (!valid) {
        return res.status(401).json({ error: 'Mot de passe incorrect !' });
      }
      res.status(200).json({
        userId: user._id,
        token: jwt.sign(
          { userId: user._id },
          `${process.env.SECRET_KEY}`,
          { expiresIn: '24h' }
        )
      });
    })
    .catch(error => res.status(500).json({ error }));
  })
};