const express = require('express');
const app = express();

const config = require('./config/config');

app.use(express.json());

const employeeRoutes = require('./routes/employeeRoutes');
app.use('/api/employees', employeeRoutes);

app.listen(config.PORT, () => {
  console.log(`Server running on port http://localhost:${config.PORT}`);
});
