const express = require('express');
const routes = express.Router();
const {LOGIN,REGISTER} = require('../global/_var');

/******* DEPENDENCYS CONTROLLER *******/

const getInfoController = require('../controllers/getInfo.controller');

/******** ROUTES DEPENDENCYS *********/

routes.post(LOGIN,getInfoController.authentication_login);
routes.post(REGISTER,getInfoController.authentication_register);

module.exports = routes;