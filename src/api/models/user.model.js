const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, trim: true, required: true, unique: true },
    nombreUsuario: { type: String, trim: true, required: true, unique: true },
    contraseña: { type: String, trim: true, required: true },
    añoNacimiento: { type: Number, trim: true, required: true },
    rol: { type: String, trim: true, required: true },
    imagenPerfil: { type: String, trim: true, required: true },
    games_property: [{type: mongoose.Schema.Types.ObjectId, ref: 'games'}]
  },
  { timestamps: true }
);


userSchema.pre('save', async function(next) {
    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (err) {
        next(err);
    }
})

const User = mongoose.model('users', userSchema);
module.exports = User;