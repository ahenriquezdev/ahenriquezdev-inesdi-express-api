const EMPLOYESS = require('../data/employees.json');
const ajv = require('../middlewares/validationMiddleware');

const getEmployees = (req, res) => {
  const { page, user, badges } = req.query;

  // consulta simple
  if (!page && !user && !badges) {
    return res.status(200).json({
      success: true,
      message: 'Employees listed successfully',
      data: EMPLOYESS
    });
  }

  // consultas paginadas
  if (page) {
    const limit = 2;
    const start = (limit * (page - 1));       // algoritmo propuesto: (2 * (N - 1))
    // const end = (limit * (page - 1)) + 1;  // algoritmo propuesto: (2 * (N - 1)) + 1
    const end = start + limit;                // se hizo un ajuste al algoritmo propuesto para calcular el limite de registros de la pagina
    const employees = EMPLOYESS.slice(start, end);

    if (employees.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No employees found for this page',
        page: page
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Employees listed successfully with pagination',
      page: page,
      data: employees
    });
  }

  // consulta por usuario
  if (user) {
    const isUser = user === 'true';

    const filteredEmployees = EMPLOYESS.filter(employee => isUser ? employee.privileges === 'user' : employee.privileges !== 'user');

    return res.status(200).json({
      success: true,
      message: isUser ?
        'Employees listed successfully with user privileges' :
        'Employees listed successfully without user privileges',
      data: filteredEmployees
    });
  }

  // consulta por badges
  if (badges) {
    if (badges) {
      const filteredEmployees = EMPLOYESS.filter(employee => employee.badges.includes(badges));

      return res.status(200).json({
        success: true,
        message: 'Employees listed successfully with badges',
        data: filteredEmployees
      });
    }
  }
}

const getOldestEmployee = (req, res) => {
  const employee = EMPLOYESS.reduce((oldest, current) => {
    if (current.age > oldest.age) {
      return current;
    }
    return oldest;
  });

  res.status(200).json({
    success: true,
    message: 'Oldest employee',
    data: employee
  });
}

const addEmployee = (req, res) => {
  const validated = ajv.validate(req.body);

  if (!validated) {
    res.status(400).json({
      success: false,
      code: 'bad_request'
    });
  } else {
    const newEmployee = req.body;
    EMPLOYESS.push(newEmployee);

    res.status(201).json({
      success: true,
      message: 'Employee created successfully',
      data: newEmployee
    });
  }
}

const getEmployeeByName = (req, res) => {
  const { name } = req.params;
  const employee = EMPLOYESS.find(employee => employee.name === name);

  if (!employee) {
    res.status(404).json({
      success: false,
      code: 'not_found'
    });
  } else {
    res.status(200).json({
      success: true,
      message: 'Employee found',
      data: employee
    });
  }
}

module.exports = {
  getEmployees,
  getOldestEmployee,
  addEmployee,
  getEmployeeByName
}

