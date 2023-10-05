const multer = require('multer')

module.exports = {
    propertyImg : (directry = "./public/property", name = "PIMG") => {
        const storage = multer.diskStorage({
            destination : (req, file, cb) => {
                cb(null, directry)
            },
            filename : (req, file, cb) => {
                cb(null,
                    "PIMG" + 
                    "-" + 
                    Date.now() +
                    Math.round(Math.random() * 10000) + 
                    "." +
                    file.mimetype.split('/')[1]
                    )
            }
        })

        const fileFilter = (req, file, cb) => {
            const extFilter = ['jpg', 'jpeg', 'png', 'webp', 'gif']
            const checkExt = extFilter.includes(file.mimetype.split('/')[1])

            if (!checkExt) {
                cb(new Error('Your file Ext Denied'), false)
            }
            else {
                cb(null, true)
            }
        }
        return multer({storage, fileFilter})
    },
    
    multerUpload: (directory = "./public", name = "PIMG") => {
        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, directory)
            },
            filename: (req, file, cb) => {
                cb(null,
                    name +
                    "-" +
                    Date.now() +
                    Math.round(Math.random() * 1000000000) +
                    "." +
                    file.mimetype.split('/')[1]
                );
            }
        });

        const fileFilter = (req, file, cb) => {
            const ext = file.mimetype.split('/')[1].toLowerCase();
            const extFilter = ['jpg', 'jpeg', 'png', 'webp'];
            const checkExt = extFilter.includes(ext);

            if (!checkExt) {
                cb(new Error("The file you are trying to upload is not supported. Only JPG, JPEG, PNG, WEBP, and GIF file formats are allowed."), false);
            } else {
                cb(null, true);
            };
        };

        const limits = {
            fileSize: 1 * 1024 * 1024, 
        };

        return multer({ storage: storage, fileFilter: fileFilter, limits: limits });
    }
};

