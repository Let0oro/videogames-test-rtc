const ConsoleRoutes = require('express').Router();
const {
    newConsole, getConsoleByID, getConsoleByName, getAllConsoles, updateConsoleByID, removeConsoleByID
} = require('../controllers/console.controller');

ConsoleRoutes.post('/new', newConsole);
ConsoleRoutes.get('/:id', getConsoleByID);
ConsoleRoutes.get('/name/:name', getConsoleByName);
ConsoleRoutes.get('/', getAllConsoles);
ConsoleRoutes.put('/edit/:id', updateConsoleByID);
ConsoleRoutes.delete('/remove/:id', removeConsoleByID);

module.exports = ConsoleRoutes;