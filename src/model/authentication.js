const pool = require('../utils/mysql.connect');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {KEY} = require('../global/_var');

/********** MODELS  DATABASE *******/

const authentication_login = async ({ email, password }) => {
    try {
        let msg = {
            status: false,
            message: 'Usuario no encontrado o credenciales incorrectas',
            code: 400
        };

        const KEY = process.env.KEY;

        const connection = await pool.getConnection();

        const SQL = 'SELECT * FROM usuarios WHERE email = ?';
        const [result] = await connection.execute(SQL, [email]);

        console.log(result);

        if (result.length > 0) {
            const user = result[0]; // Accede al primer elemento de la fila devuelta

            const isPasswordCorrect = await bcrypt.compare(password, user.password); // Compara la contraseña

            if (isPasswordCorrect) {
                const token = JWT.sign(
                    { userId: user.id_usuario, email: user.email },
                    KEY,
                    { expiresIn: '1h' }
                );

                msg = {
                    status: true,
                    message: 'Autenticación correcta',
                    code: 200,
                    token: token
                };
            } else {
                msg.message = 'Contraseña incorrecta';
            }
        }

        connection.release();
        return msg;
    } catch (err) {
        console.error(err);
        return {
            status: false,
            message: 'Error en la autenticación',
            code: 500
        };
    }
};


const authentication_register = async ({ nombre, email, telefono, created_at, password, apellido }) => {
    try {
        let msg = {
            status: false,
            message: 'Error al registrar',
            code: 500
        };

        const connection = await pool.getConnection();

        // Verificar si el email ya está registrado
        const checkEmailSQL = 'SELECT COUNT(*) AS count FROM usuarios WHERE email = ?';
        const [checkResult] = await connection.execute(checkEmailSQL, [email]);

        if (checkResult[0].count > 0) {
            connection.release();
            return {
                status: false,
                message: 'El email ya está registrado',
                code: 400
            };
        }

        // Generar el hash de la contraseña
        const saltRounds = 10; // Determina el costo del hash
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Insertar el usuario en la base de datos con la contraseña hasheada
        const insertSQL = 'INSERT INTO usuarios (nombre, email, telefono, created_at, password, apellido) VALUES (?, ?, ?, ?, ?, ?)';
        const [result] = await connection.execute(insertSQL, [nombre, email, telefono, created_at, hashedPassword, apellido]);

        if (result.affectedRows > 0) {
            msg = {
                status: true,
                message: 'Registro exitoso',
                code: 200
            };
        }

        connection.release();
        return msg;
    } catch (err) {
        console.error(err);
        return {
            status: false,
            message: 'Error en el registro',
            code: 500
        };
    }
};

/******** EXPORTS MODELS ********/

module.exports = {
  authentication_login,
  authentication_register
}