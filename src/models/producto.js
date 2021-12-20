const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductoSchema = new Schema({
    nombre: { type: String, require: true },
    tipo: { type: String, require: true },
    precio: { type: String, require: true },
    cantidad: { type: Number, require: true },
    categoria: { type: Schema.Types.ObjectId, ref: 'Categoria' }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('Producto', ProductoSchema);