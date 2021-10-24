const express = require('express');

const API_ADDRESS = process.env.API_ADDRESS
const API_PORT = process.env.API_PORT || 9000

const API_URL = `http://${API_ADDRESS}:${API_PORT}/`

const PY_ADDRESS = process.env.PY_ADDRESS
const PY_PORT = process.env.PY_PORT || 3060

const PY_URL = `http://${PY_ADDRESS}:${PY_PORT}/api/random_encounter`

const router = express.Router();
const db_url = 'localhost:3030'

router.get('/', (req, res) => {
    res.render('index.ejs', { API_URL: API_URL, PY_URL: PY_URL })
})

router.get('/health', (req, res) => {
    res.send('ok')
})

router.post(db_url, (req, res) => {
    console.log('post request on node middleware')
})


module.exports = app => app.use('/', router);