const express = require('express');
const routerUsuario = express.Router();
const Usuario = require('../models/usuario');

routerUsuario.get('/', async(req, res) => {
    const usuarios = await Usuario.find();
    res.json(usuarios);
});

routerUsuario.post('/', async(req, res) => {
    const { nombre, email, contrasenia } = req.body;
    const usuario = new Usuario({
        nombre,
        email,
        contrasenia
    });
    await usuario.save();
    res.json({ status: 'Usuario saved' });
});

routerUsuario.put('/:id', async(req, res) => {
    await Usuario.findByIdAndUpdate(req.params.id, req.body);
    res.json({ status: 'Usuario updated' });
});

routerUsuario.delete('/:id', async(req, res) => {
    await Usuario.findByIdAndDelete(req.params.id);
    res.json({ status: 'Usuario eliminated' });
});

routerUsuario.post('/signin', async(req, res) => {
    var { email, contrasenia } = req.body;
    var usuario = await Usuario.findOne({ 'email': email });
    if (!usuario) return res.status(401).send('El usuario no existe');
    if (usuario.contrasenia !== contrasenia) return res.status(401).send('Contraseña incorrecta');
    console.log(usuario);
    return res.json(usuario);
});

module.exports = routerUsuario;