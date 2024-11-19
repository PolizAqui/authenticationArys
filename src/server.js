/******** dependencys ********/

const express = require('express');
const cors = require('cors');
const _var = require('./global/_var');
const app = express();

/******* midleware ******/

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/******* routes ********/

const routes = require('./routes/authentication.routes');

/******* server *********/

app.listen(_var.PORT, (err) => {
    if(err) throw err;
    console.log(`Servidor inicializado en el puerto: http://localhost:${_var.PORT}`);
})

/******* use app ******/

app.use(routes)