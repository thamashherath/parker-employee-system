const express = require('express');

const {
  createEmployee
} = require('../controllers/employeeController');
const router = new express.Router();

// Getting all bids
router.post('/api/employees/add',createEmployee);

module.exports = router;
