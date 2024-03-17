const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema(
  {
    name: {
      type: String,
      
    },
    email: {
      type: String,
      unique: [true],
    },
    mobNo: {
      type: String,
      
    },
    designation: {
      type: String,
      
    },
    gender: {
      type: String,
      
    },
    courses: {
      type: [String],
    },
    imageName: {
      type: String,
    },
    imagePath: {
      type: String,
    },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Employee", employeeSchema);
