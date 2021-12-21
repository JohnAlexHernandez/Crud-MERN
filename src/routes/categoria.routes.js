const express = require('express');
const routerCategoria = express.Router();
const Categoria = require('../models/categoria');
const Usuario = require('../models/usuario');

routerCategoria.get('/user/:id', async(req, res) => {
    await Categoria.find({ 'usuario': req.params.id }).populate('usuario').exec((err, categorias) => {
        if (res.status(200)) {
            res.json(categorias);
        }
    });
});

routerCategoria.post('/:id', async(req, res) => {
    const { nombre, descripcion } = req.body;
    const categoria = new Categoria({
        nombre,
        descripcion
    });
    const usuario = await Usuario.findOne({ '_id': req.params.id });
    categoria.usuario = usuario;
    await categoria.save();
    res.json({ status: 'Categoria saved' });
});

routerCategoria.put('/:id', async(req, res) => {
    await Categoria.findByIdAndUpdate(req.params.id, req.body);
    res.json({ status: 'Categoria updated' });
});

routerCategoria.delete('/:id', async(req, res) => {
    await Categoria.findByIdAndDelete(req.params.id);
    res.json({ status: 'Categoria eliminated' });
});

routerCategoria.get('/:id', async(req, res) => {
    const categoria = await Categoria.findById(req.params.id);
    res.json(categoria);
});

module.exports = routerCategoria;