const express = require('express');
const cors = require('cors');
// importar rutas
const interpreterRoute = require('./routes/interprete.routes');
const app = express();
//app.use(cors);
const allowedOrigins = ['http://localhost:3000'];

const options= {
  origin: allowedOrigins
}
app.use(cors(options));
app.use(express.json()); // middleware parse request body to json

const PORT = 5000;

app.use('/interpreter', interpreterRoute);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}
);
