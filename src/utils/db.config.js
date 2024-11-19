const { USER, NAME, PASS, HOST } = require('../global/_var.js')

module.exports = {
    host: HOST,
    user: USER,
    database: NAME,
    password: PASS,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
}