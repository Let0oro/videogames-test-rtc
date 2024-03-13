const mongoose = require("mongoose");

const videogameSchema = new mongoose.Schema(
  {
    title: String,
    genre: String,
    date: Number,
    pegi: Number,
    console_compatibility: [{type: mongoose.Schema.Types.ObjectId, ref: 'consoles'}],
  },
  { timestamps: true }
);

const Videogame = mongoose.model('games', videogameSchema);
module.exports = Videogame;