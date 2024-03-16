const Videogame = require('../models/videogame.model');

async function newVideogame(req, res, next) {

    try {
        const game = new Videogame(req.body);
        const gameDB = await game.save();
        return res.status(201).json(game.title)
    } catch (err) {
        return next(err);
    }
};

async function getAllVideogames(req, res, next) {
    try {
        const games = await Videogame.find();
        return res.status(200).json(games)
    } catch (err) {
        return next(err)
    }
}

async function getVideogameByID(req, res, next) {
    const { id } = req.params;
    try {
        const game = await Videogame.findById(id);
        return res.status(200).json(game)
    } catch (err) {
        return next(err)
    }
}

async function getVideogamesByTitle(req, res, next) {
    const { title } = req.params;
    try {
        const game = await Videogame.findOne({ title: title });
        return res.status(200).json(game);
    } catch (err) {
        return next(err);
    }
}

async function updateVideogameByID(req, res, next) {
    const { id } = req.params;
    try {
        const gameModify = new Videogame(req.body);
        gameModify._id = id;
        const gameUpdated = await Videogame.findByIdAndUpdate(id, gameModify, {new: true})
        return res.status(200).json(gameUpdated)
    } catch (err) {
        return next(err)
    }
}

async function removeVideogameByID(req, res, next) {
    const { id } = req.params;
    try {
        await Videogame.findByIdAndDelete(id);
        res.status(200).json('Videogame deleted!');
    } catch (err) {
        return next(err)
    }
}

module.exports = {
    newVideogame, getVideogameByID, getVideogamesByTitle, getAllVideogames, updateVideogameByID, removeVideogameByID
};