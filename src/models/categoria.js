const mongoose = require('mongoose');
const { Schema } = mongoose;

const CategoriaSchema = new Schema({
    nombre: { type: String, require: true },
    descripcion: { type: String, require: true },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('Categoria', CategoriaSchema);