const express = require('express');
const router = express.Router();

const {
  getEmployees,
  getOldestEmployee,
  addEmployee,
  getEmployeeByName } = require('../controllers/employeeController');

// 1. GET http://localhost:8000/api/employees
// 2. GET http://localhost:8000/api/employees?page=1
// 3. GET http://localhost:8000/api/employees?page=2
// 4. GET http://localhost:8000/api/employees?page=N
// 6. GET http://localhost:8000/api/employees?user=true
// 8. GET http://localhost:8000/api/employees?badges=black
router.get('/', getEmployees);

// 5. GET http://localhost:8000/api/employees/oldest
router.get('/oldest', getOldestEmployee);

// 7. POST http://localhost:8000/api/employees
router.post('/', addEmployee);

// 9. GET http://localhost:8000/api/employees/NAME
router.get('/:name', getEmployeeByName);

module.exports = router;
