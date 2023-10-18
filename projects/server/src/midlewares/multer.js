const multer = require("multer");
const fs = require("fs");

module.exports = {
  propertyImg: (directry = "./public/property", name = "PIMG") => {
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, directry);
      },
      filename: (req, file, cb) => {
        cb(
          null,
          "PIMG" +
            "-" +
            Date.now() +
            Math.round(Math.random() * 10000) +
            "." +
            file.mimetype.split("/")[1]
        );
      },
    });

    const fileFilter = (req, file, cb) => {
      const extFilter = ["jpg", "jpeg", "png", "webp", "gif"];
      const checkExt = extFilter.includes(file.mimetype.split("/")[1]);

            if (!checkExt) {
                cb(new Error('Your file Ext Denied'), false)
            }
            else {
                cb(null, true)
            }
        }
        return multer({storage, fileFilter})
    },

    multerUpload: (directory, name = "PIMG") => {
      let defaultDirectory = "./public"; 
      const storage = multer.diskStorage({
          destination: (req, file, cb) => {
              const pathDirectory = directory? defaultDirectory + directory: defaultDirectory;
      if (fs.existsSync(pathDirectory)) {
        cb(null, pathDirectory);
      } else {
        fs.mkdir(pathDirectory, { recursive: true }, (err) => {
          if (err) {
            console.log(err);
          }
          cb(err, pathDirectory);
        });
      }
          },
          filename: (req, file, cb) => {
              cb(null, 
                  name +
                  "-" +
                  Date.now() +
                  Math.round(Math.random() * 100000) +
                  "." +
                  file.mimetype.split('/')[1]
              )
          }
      })

      const fileFilter = (req, file, cb) => {
          const extFilter = ['jpg', 'jpeg', 'png', 'gif']
          const checkExt = extFilter.includes(file.mimetype.split('/')[1].toLowerCase())

          if (!checkExt) {
              cb(new Error("Your file ext denied"), false)
          } else {
              cb(null, true)
          }
      }

      const fileLimit = 1024*1024
      return multer({ storage, fileFilter, limits:{fileSize:{fileLimit}} })
  }
};
