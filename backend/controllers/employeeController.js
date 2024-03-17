const Employee = require("../models/employee");

const EmployeeController = {
  updateById: async (req, res) => {
    try {
      const { id, name, email, mobNo, designation, gender, courses } = req.body;
      let imagePath, imageName;

      // Check if image file exists in the request
      if (req.file) {
        imagePath = req.file.filename;
        imageName = req.file.originalname;
      }

      const avalableUser = await Employee.findByIdAndUpdate(
        id,
        {
          name,
          email,
          mobNo,
          designation,
          gender,
          courses,
          // Include imagePath and imageName only if an image is provided
          ...(imagePath && { imagePath }),
          ...(imageName && { imageName }),
        },
        { new: true }
      );

      if (!avalableUser) {
        res.status(400);
        throw new Error("Id not found");
      }

      res.json(avalableUser);
    } catch (err) {
      console.error("Error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.body;
      console.log("This is from getting By id...", id);
      const employee = await Employee.findById(id);
      if (employee) {
        res.status(200);
        res.json(employee);
      } else {
        // throw new Error("No Employee")
      }
    } catch (err) {
      throw new Error("No Employee Found");
    }
  },
  deleteEmployee: async (req, res) => {
    try {
      const { id } = req.body;
      console.log("This is from deleting Employee", id);
      const deletedItem = await Employee.findByIdAndDelete(id);

      if (!deletedItem) {
        return res.status(404).json({ error: "Item not found" });
      }

      res.json({ message: "Item deleted successfully", deletedItem });
    } catch (e) {
      throw new Error("Employee not deleted");
    }
  },
  getAllEmployee: async (req, res) => {
    try {
      console.log("This is from getting all users...");
      const employee = await Employee.find();
      res.status(200);
      res.json(employee);
    } catch (err) {
      throw new Error("No Employee Found");
    }
  },
  createEmployee: async (req, res) => {
    try {
      console.log("Req file", req.file);
      const { name, email, mobNo, designation, gender, courses } = req.body;

      console.log("Recived from create Employee", req.body);

      const avalableUser = await Employee.findOne({ email });
      if (avalableUser) {
        res.status(400);
        throw new Error("Email already been registered");
      }
      const employee = await Employee.create({
        name,
        email,
        mobNo,
        designation,
        gender,
        courses,
        imagePath: req.file.filename,
        imageName: req.file.originalname,
        // img: Buffer.from(img, "base64"),
      });
      await employee.save();
      if (employee) {
        res.status(200).json(employee);
      }
    } catch (error) {
      res
        .status(500)
        .json({ msg: "Error while creating employee", error: error.message });
    }
  },
};

module.exports = EmployeeController;
