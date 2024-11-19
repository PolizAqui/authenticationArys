require('dotenv').config();

/****** ROUTES  ENV *******/

const PORT = process.env.PORT;
const KEY  = process.env.KEY;

/******* DATABASE ******/

const NAME = process.env.NAME;
const USER = process.env.USER;
const PASS = process.env.PASS;
const HOST = process.env.HOST;

/****** ENDPOINTS *******/

const LOGIN = process.env.LOGIN;
const REGISTER = process.env.REGISTER;

module.exports = {
    PORT,
    KEY,
    NAME,
    USER,
    PASS,
    HOST,
    LOGIN,
    REGISTER,
}