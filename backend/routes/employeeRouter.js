const EmployeeController = require("../controllers/employeeController");
const express = require("express");
const router = express.Router();
const multer = require("multer");
// const path = require("path");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/Images");
//   },
//   filename: (req, file, cb) => {
//     cb(
//       null,
//       file.fieldname + "_" + Date.now() + path.extname(file.originalname)
//     );
//   },
// });
// const upload = multer({ storage: storage });

// router.post("/create-employee",async (req, res) => {

//     try {
//         const { name, data } = req.body;
//         const newImage = new Image({ name, data: Buffer.from(data, 'base64') });
//         await newImage.save();
//         res.status(201).send('Image uploaded successfully.');
//       } catch (err) {
//         console.error('Error uploading image:', err);
//         res.status(500).send('Internal server error.');
//       }

// });
const storage = multer.diskStorage({
  destination: (req, file, cd) => {
    cd(null, "images");
  },
  filename: (req, file, cd) => {
    cd(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/create-employee",
  upload.single("img"),
  EmployeeController.createEmployee
);
router.get("/get-employee", EmployeeController.getAllEmployee);
router.post("/delete-employee", EmployeeController.deleteEmployee);
router.post("/get-employee-by-id", EmployeeController.getById);
router.post(
  "/update-by-id",
  upload.single("img"),
  EmployeeController.updateById
);

module.exports = router;
