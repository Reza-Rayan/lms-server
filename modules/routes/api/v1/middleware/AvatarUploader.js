const multer = require('multer');
const path = require('path');
const fs = require('fs');


// Create Folders of Uploads Based on Date
const getUploadsPath = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return path.join('uploads','avatars', year.toString(), month, day);
};

// Create Directories
const createDirectories = (dirPath) => {
  dirPath.split(path.sep).reduce((currentPath, folder) => {
    currentPath += folder + path.sep;
    if (!fs.existsSync(currentPath)) {
      fs.mkdirSync(currentPath);
    }
    return currentPath;
  }, '');
};


// Multer Storage Config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = getUploadsPath();
    createDirectories(uploadPath);
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  },
});

// File Filter (Optional): Accept only certain file types
const fileFilter = function (req, file, cb) {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error('فقط می توانید عکس بارگذاری کنید'), false);
  }
  cb(null, true);
};

// Initialize Multer Upload
const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;
