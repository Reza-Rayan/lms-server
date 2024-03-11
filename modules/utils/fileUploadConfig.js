const fileUpload = require("express-fileupload");
const path = require("path");
const fs = require("fs");

// Create Folders of Uploads Based on Date
const getUploadsPath = () => {
  let now = new Date();
  let year = now.getFullYear();
  let month = String(now.getMonth() + 1).padStart(2, "0");
  let day = String(now.getDate()).padStart(2, "0");
  return path.join("uploads", "banners", year.toString(), month, day);
};

// Create Directory
const createDirectories = (dirPath) => {
  dirPath.split(path.sep).reduce((currentPath, folder) => {
    currentPath += folder + path.sep;
    if (!fs.existsSync(currentPath)) {
      fs.mkdirSync(currentPath);
    }
    return currentPath;
  }, "");
};

// Express FileUpload Configuration
const configureFileUpload = () => {
  return fileUpload({
    createParentPath: true,
    limits: {
      fileSize: 10 * 1024 * 1024, // 10MB limit
    },
    useTempFiles: true,
    tempFileDir: "/tmp/",
    safeFileNames: true,
    preserveExtension: true,
    abortOnLimit: true,
    responseOnLimit: "حجم فایل ارسالی بیشتر از حد مجاز است",
    uploadTimeout: 10000, // 10 seconds
    useTempFiles: true,
    tempFileDir: getUploadsPath(),
    debug: process.env.NODE_ENV !== "production",
  });
};

module.exports = configureFileUpload;
