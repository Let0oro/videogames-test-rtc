const VideogameRoutes = require('express').Router();
const {
    newVideogame, getVideogameByID, getVideogamesByTitle, getAllVideogames, updateVideogameByID, removeVideogameByID
} = require('../controllers/videogame.controller');

VideogameRoutes.post('/new', newVideogame);
VideogameRoutes.get('/:id', getVideogameByID);
VideogameRoutes.get('/title/:title', getVideogamesByTitle);
VideogameRoutes.get('/', getAllVideogames);
VideogameRoutes.put('/edit/:id', updateVideogameByID);
VideogameRoutes.delete('/remove/:id', removeVideogameByID);

module.exports = VideogameRoutes