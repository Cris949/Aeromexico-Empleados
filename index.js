const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const employees = {
        "empleados": [
            {
                "numeroEmp": 123,
                "nombre": "Pedro",
                "apellidos": "Rodriguez"
            },
            {
                "numeroEmp": 213,
                "nombre": "Luis",
                "apellidos": "Fernández"
            },
            {
                "numeroEmp": 321,
                "nombre": "Lucia",
                "apellidos": "Domínguez"
            }
        ]
    };


// GET - Obtener lista empleados
app.get('/employee', (req, res) => {
    return res.status(200).json(employees)
});
// GET Obtener sóloo 1 empleado
app.get('/employee/api/:employee_number', (req, res) => {


    const employee = employees.empleados.find(c => c.numeroEmp === parseInt(req.params.employee_number))

    if (!employee) {
        return res.status(404).json({ error: "Employee not found" });
    }else{
        return res.status(200).json({ employee });
    }
        
});


// POST - Agregar un nuevo empleado
app.post('/employee/registro', (req, res) => {
    const { employee_number, name, position, salary } = req.body;

    // Validar que todos los campos son requeridos
    if (!employee_number || !name || !position || !salary) {
        return res.status(400).json({ error: "All fields are required: employee_number, name, position, salary" });
    }

    // Validar que employee_number es un int
    if (typeof employee_number !== 'number') {
        return res.status(400).json({ error: "Employee number must be an integer" });
    }

    // Agregar empleado
    employees.empleados[employee_number] = { name, position, salary };
    return res.status(201).json({ message: "Employee added successfully" });
});

// PUT - Actualizar empleado
app.put('/employee/:employee_number', (req, res) => {
    const employee_number = parseInt(req.params.employee_number);

    if (!employees[employee_number]) {
        return res.status(404).json({ error: "Employee not found" });
    }

    const { name, position, salary } = req.body;

    // Actualizar solo los datos enviados
    if (name) employees[employee_number].name = name;
    if (position) employees[employee_number].position = position;
    if (salary) employees[employee_number].salary = salary;

    return res.status(200).json({ message: "Employee updated successfully" });
});

// DELETE - Eliminar empleado
app.delete('/employee/:employee_number', (req, res) => {
    const employee_number = parseInt(req.params.employee_number);

    if (!employees[employee_number]) {
        return res.status(404).json({ error: "Employee not found" });
    }

    delete employees[employee_number];
    return res.status(200).json({ message: "Employee deleted successfully" });
});

const PORT = 80;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



