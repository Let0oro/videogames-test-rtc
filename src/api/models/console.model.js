const mongoose = require('mongoose');

const consoleSchema = new mongoose.Schema(
    {
        name: String, 
        age: Number, 
        color: String,
        company: String,
        games_compatibility: [{type: mongoose.Schema.Types.ObjectId, ref: 'games'}],
    }
)

const Console = mongoose.model('consoles', consoleSchema);
module.exports = Console;