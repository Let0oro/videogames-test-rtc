const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, trim: true, required: true, unique: true },
    name: { type: String, trim: true, required: true, unique: true },
    password: { type: String, trim: true, required: true },
    birthAge: { type: Number, trim: true, required: true },
    isAdmin: { type: String, trim: true },
    rol: { type: Boolean, trim: true },
    image: { type: String, trim: true, required: true },
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