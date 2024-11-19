const {authentication_login,authentication_register} = require('../model/authentication');

const controller = {};

controller.authentication_login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body);
        
        
        if (!email || !password) {
            return res.status(400).json({
                status: false,
                message: 'El email y la contraseña son obligatorios',
            });
        }
        const response = await authentication_login({ email, password });
        return res.status(response.code).json(response);
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            status: false,
            message: 'Error interno del servidor',
        });
    }
};

controller.authentication_register = async (req, res) => {
    const { nombre, email, telefono, created_at, password, apellido } = req.body;

    if (!nombre || !email || !telefono || !created_at || !password || !apellido) {
        return res.status(400).json({
            status: false,
            message: 'Todos los campos son obligatorios',
        });
    }

    try {
        const response = await authentication_register({ nombre, email, telefono, created_at, password, apellido });
        return res.status(response.code).json(response);
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            status: false,
            message: 'Error interno del servidor',
        });
    }
};



module.exports = controller;