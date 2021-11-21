const jwt = require('jsonwebtoken');

const mysql = require('mysql');
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'dactylographierais',
  database: 'p7'
});

module.exports = (req, res, next) => {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, `${process.env.SECRET_KEY}`);
    const userId = decodedToken.userId
    con.query('SELECT * FROM user WHERE id=?', userId, (err, type) => {
        if (err){res.status(401).json({err})}
        else {
            if (req.body.role && user[0].type != req.body.role){
                res.status(401).json({message: 'You do not have the rights!'})
            } else {
                next();
            }
        }
        
    })
}