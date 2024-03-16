const Console = require('../models/console.model');

async function newConsole(req, res, next) {
    try {

    const console = new Console(req.body);
    const consoleDB = await console.save();
    return res.status(201).json(consoleDB.name)
    } catch (err) {
        return next(err);
    }
};

async function getAllConsoles(req, res, next) {
    try {
        const consoles = await Console.find();
        return res.status(200).json(consoles)
    } catch (err) {
        return next(err)
    }
}

async function getConsoleByID(req, res, next) {
    const { id } = req.params;
    try {
        const console = await Console.findById(id);
        return res.status(200).json(console)
    } catch (err) {
        return next(err)
    }
}

async function getConsoleByName(req, res, next) {
    const { name } = req.params;
    try {
        const console = await Console.findOne({name: name});
        return res.status(200).json(console);
    } catch (err) {
        return next(err);
    }
}

async function updateConsoleByID(req, res, next) {
    const { id } = req.params;
    try {
        const consoleModify = new Console(req.body);
        consoleModify._id = id;
        const consoleUpdated = await Console.findByIdAndUpdate(id, consoleModify, {new: true})
        return res.status(200).json(consoleUpdated)
    } catch (err) {
        return next(err)
    }
}

async function removeConsoleByID(req, res, next) {
    const { id } = req.params;
    try {
        await Console.findByIdAndDelete(id);
        res.status(200).json('Console deleted!');
    } catch (err) {
        return next(err)
    }
}

module.exports = {
    newConsole, getAllConsoles, getConsoleByName, getConsoleByID, updateConsoleByID, removeConsoleByID
};