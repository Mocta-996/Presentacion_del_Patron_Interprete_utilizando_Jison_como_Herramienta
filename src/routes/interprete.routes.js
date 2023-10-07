//import express from 'express'; // ESModules
const express = require('express'); // CommonJS
//import { interpreteController } from '../controllers/interprete.controller';
const interpreteController = require('../controllers/interprete.controller');

const router = express.Router();


// ping pong test route
// sin controlador
/*
router.get('/ping', (_req, res) => {
  res.send('Pong interpreter OLC1');
}
);
*/

// con controlador
router.get('/ping', interpreteController.pong);

// interpretar codigo fuente
router.post('/interpretar', interpreteController.interpretar);
//export default router;
module.exports = router;
