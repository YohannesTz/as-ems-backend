const express = require('express');
const router = express.Router();

const employeeController = require('../controller/EmployeeController');

router.post('/add', employeeController.addEmployee);
router.get('/', employeeController.getAllEmployees);
router.get('/:id', employeeController.getById);
router.put('/:id', employeeController.updateEmployee);
router.delete('/:id', employeeController.removeEmployee);

module.exports = router;