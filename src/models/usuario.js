const mongoose = require('mongoose');
const { Schema } = mongoose;

const UsuarioSchema = new Schema({
    nombre: { type: String, require: true },
    email: { type: String, require: true },
    contrasenia: { type: String, require: true }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('Usuario', UsuarioSchema);