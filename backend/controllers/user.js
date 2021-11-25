const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const mysql = require('mysql');
const con = require('../db_connection')

exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
    const userObject = {'username':req.body.username, 'email_adress':req.body.email_adress, 'password':hash, 'type':'member'}
    con.query('INSERT INTO user SET ?', userObject, (err, resp) => {
      console.log(resp)
      console.log(resp.insertId)
      con.query('SELECT * FROM user WHERE id=?', resp.insertId, (err, user) => {
        console.log(user)
        if (err){res.status(400).json({ err })}
        else {res.status(201).json({
          userId: user[0].id,
          role: 'member',
          token: jwt.sign(
            { userId: user[0].id },
            `${process.env.SECRET_KEY}`,
            { expiresIn: '24h' }
          )
        })}
      })
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
        userId: user[0].id,
        role: user[0].type,
        token: jwt.sign(
          { userId: user[0].id },
          `${process.env.SECRET_KEY}`,
          { expiresIn: '24h' }
        )
      });
    })
    .catch(error => res.status(500).json({ error }));
  })
};
exports.getuser = (req, res, next) => {
  con.query(`SELECT * FROM user WHERE id = ?`, req.params.id, (err, resp) => {
    console.log(resp)
    if (err){res.status(404).json({err})}
    else {res.status(200).json(resp)}
  })
};
exports.deleteUser = (req, res, next) => {
  con.query('SELECT * FROM user WHERE id=?', req.params.userId, (err, resp) => {
    console.log("user:", resp)
    if (req.params.userId == resp[0].id) {
      con.query('UPDATE thread SET creatorId=15 WHERE creatorId=?', req.params.userId, (err, resp) => {
        con.query('UPDATE post SET creatorId=15 WHERE creatorId=?', req.params.userId, (err, resp) => {
          con.query('DELETE FROM user WHERE id=?', req.params.userId, (err, resp) => {
            console.log(resp)
            if (err){res.status(400).json({err})}
            else {res.status(200).json({ message: 'Objet supprimé !'})}
          })
        })
      })
      
    } else {
      res.status(400).json({message: "You are not this user."})
    }
  })
};
