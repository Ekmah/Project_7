const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  "image/gif": "gif"
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    console.log(file.mimetype)
    if (['image/jpg', 'image/jpeg', 'image/png', 'image/gif'].includes(file.mimetype)) {
      console.log("test")
      const name = file.originalname.split(' ').join('_');
      const extension = MIME_TYPES[file.mimetype];
      callback(null, name + Date.now() + '.' + extension);
    } else {
      callback(new Error ('wrong type of file'))
    }
  }
});

module.exports = multer({storage: storage}).single('image');