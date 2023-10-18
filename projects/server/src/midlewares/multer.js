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

    multerUpload: (directory , name ) => {
        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory, { recursive: true });
        }
        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, directory)
            },
            filename: function (req, file, cb) {
              const uniqueSuffix = name + '-' + Date.now() + '-' + Math.round(Math.random() * 1e9);
              const fileExtension = file.originalname.split('.').pop();
              cb(null, uniqueSuffix + '.' + fileExtension);
            }
        })
        
        const fileFilter = function (req, file, cb) {
          const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
          const fileExtension = file.originalname.toLowerCase().split('.').pop();
          
          if (allowedExtensions.includes('.' + fileExtension)) {
            cb(null, true);
          } else {
            cb(new Error('Only .jpg .jpeg and .png extension'));
          }
        };
        const fileSizeLimit = 1024 * 1024;
        return multer({ storage, fileFilter, limits:{fileSize:fileSizeLimit}, preservePath:true });
    }
};
