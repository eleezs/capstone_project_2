const multer = require ('multer');
const response = require ('../helper/response');

const makeMulterUploadMiddleware= (multerUploadFunction) =>{
  return (req, res, next) =>
      multerUploadFunction(req, res, err => {
          // handle Multer error
          if (err && err.name && err.name === 'MulterError') {
            return response(res, false, 500,` ${err.message}`)
             
          }
          // handle other errors
          if (err) {
            return response(res, false, 500,`Something wrong ocurred when trying to upload the file`)
          }

          next();
      });
}
const maxSize = 5 * 1024 *1024;
const upload = multer({dest: './public/data/uploads',
  limits: {fileSize: maxSize}})
const multerUploadMiddleware = makeMulterUploadMiddleware(upload.array('files'))


module.exports = multerUploadMiddleware