const express = require('express');
const router = express.Router();
const Producto = require('../models/producto');
const Categoria = require('../models/categoria');

router.get('/categoria/:id', async(req, res) => {
    await Producto.find({ 'categoria': req.params.id }).populate('categoria').exec((err, productos) => {
        if (res.status(200)) {
            res.json(productos);
        }
    });
});

router.post('/:id', async(req, res) => {
    const { nombre, tipo, precio, cantidad } = req.body;
    const producto = new Producto({
        nombre,
        tipo,
        precio,
        cantidad
    });
    const categoria = await Categoria.findOne({ '_id': req.params.id });
    producto.categoria = categoria;
    await producto.save();
    res.json({ status: 'Producto saved' });
});

router.put('/:id', async(req, res) => {
    await Producto.findByIdAndUpdate(req.params.id, req.body);
    res.json({ status: 'Producto updated' });
});

router.delete('/:id', async(req, res) => {
    await Producto.findByIdAndDelete(req.params.id);
    res.json({ status: 'Producto eliminated' });
});

router.get('/:id', async(req, res) => {
    const producto = await Producto.findById(req.params.id);
    res.json(producto);
});

module.exports = router;