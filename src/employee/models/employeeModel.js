const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const employee_schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    maxlength: 20,
    minlength: 2,
    validate(value) {
      this.first_name = value.replace(/\s/g, "");
    },
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  profile_picture: {
    type: Buffer,
    maxsize:10
  },
  status: {
    type: String,
    default:"Active",
    enum: ["Active", "Deleted"],
  },

},
    {
      timestamps: true
    });

employee_schema.set("toObject", { virtuals: true });
employee_schema.set("toJSON", { virtuals: true });
employee_schema.methods.toJSON = function () {
  const employee = this;
  const employeeObject = employee.toObject();
  delete employeeObject.password;
  delete employeeObject.tokens;
  delete employeeObject.__v;
  delete employeeObject._id;
  delete employeeObject.id;
  return employeeObject;
};


employee_schema.pre("save", async function (next) {
  const employee = this;
  if (employee.isModified("password")) {
    employee.password = await bcrypt.hash(employee.password, 8);
  }
  next();
});


const Employee = mongoose.model("Employee", employee_schema);

module.exports = Employee;
