const Employee = require("../models/employeeModel");
const logger = require("../../../Logger");

const createEmployee = async (req, res) => {
  try {
    const bodyData = req.body;
    const keys = Object.keys(req.body);

    //validating allowed keys
    const allowedKeys = [
      "name",
      "email",
      "profile_picture",
      "status"
    ];
    const isValidOperation = keys.every((key) => {
      return allowedKeys.includes(key);
    });

    //checking email and name are non empty values
    if (!bodyData.email || !bodyData.name) {
      res.status(400).send({ message: "please fill mandatory fields" });
      return;
    }


    if (!isValidOperation || keys.length === 0) {
      res.status(400).send({ message: "invalid request" });
      return;
    }

    const employee = await new Employee({
      ...req.body,
    });

    if (!employee) {
      res.status(400).send({ message: "invalid request" });
    } else {
      await employee.save();
      // getting created employee details without confidential details
      const new_employee = employee.toJSON();
      res.status(201).send(new_employee);
    }
  } catch (e) {
    //logging error messages to log file
    logger.error("Error in creating employee" + e.message);
    res.status(500).send(e.message);
  }
};


module.exports = {
  createEmployee,
};
