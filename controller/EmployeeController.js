const Employee = require('../models/EmployeeModel');

const employeeController = {};

employeeController.addEmployee = async (req, res) => {
    const { name, birth_date, gender, salary } = req.body;

    console.log(req.body);


    if (!name || !birth_date || !gender || !salary) {
        return res.status(400).json({ sucess: false, message: 'please enter all fields' });
    }

    Employee.findOne({ name, birth_date })
        .then(emp => {
            if (emp) {
                return res.status(400).json({ sucess: false, msg: 'Employee already exists!!' });
            } else {
                const newEmployee = new Employee({
                    name,
                    birth_date,
                    gender,
                    salary
                })

                newEmployee.save().then(employee => {
                    res.send({
                        sucess: true,
                        employee
                    })
                });
            }
        }).catch(err => {
            res.status(500).json({ sucess: false, message: err });
        });
}

employeeController.getAllEmployees = async (req, res) => {
    Employee.find({}, (err, emp) => {
        if (emp) {
            res.json({ sucess: true, emp });
        }
        if (err) {
            res.status(500).json({ sucess: false, message: err });
        }
    })
}

employeeController.getByName = async (req, res) => {
    const { name } = req.body;

    Employee.findOne({ name })
        .then(emp => {
            //if(emp) {
            res.json({ sucess: true, emp });
            //}
        }).catch(err => {
            res.json({ sucess: false, err });
        })
}

employeeController.getById = async (req, res) => {
    const id = req.params.id;

    Employee.findById(id).then(emp => {
        res.json({ sucess: true, emp });
    }).catch(err => {
        res.json({ sucess: false, err });
    })
}

employeeController.updateEmployee = async (req, res) => {
    const id = req.params.id;

    const { employee } = req.body;

    Employee.findByIdAndUpdate(id, employee).then(upEmp => {
        if (!upEmp) {
            res.status(404).json({ sucess: false, message: 'could not update employee' });
        } else {
            res.send({ sucess: true, employee: upEmp });
        }
    }).catch(err => {
        res.json({ sucess: false, err });
    })
}

employeeController.removeEmployee = async (req, res) => {
    const id = req.params.id;

    Employee.findByIdAndRemove(id).then(result => {
        if (!result) {
            res.status(404).send({
                sucess: flase,
                message: 'Could not delete employee'
            });
        } else {
            res.send({ sucess: true, message: 'Employee removed' });
        }
    })
}

module.exports = employeeController;