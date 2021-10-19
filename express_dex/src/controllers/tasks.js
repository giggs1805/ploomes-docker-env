const express = require('express');
// const requests = require('./pyrequests');

const router = express.Router();

// router.get('/py', async (req, res) => {
//     try {
//         return console.log('GET request to py collection').redirect('/')
//     } catch (err) {
//         return res.send(err)
//     }
// })

router.get('/db', async(req, res) => {
    return console.log('GET request to mongoose database')
})

router.get('localhost:3060/api/random_encounter', async(req, res) => {
    try {
        console.log(req)
        return req
    } catch (err) {
        return res.status(err).send('oh nonononono https://www.youtube.com/watch?v=6OtKNEc6Uoo')
    }
})

// async function newRequest() {
//     const url = "http://127.0.0.1:3060/api/random_encounter"
//     try {
//         const response = await fetch(url);
//         const data = await response.json();
//         updateFields(data);
//     } catch (err) {
//         return alert(err + ' :(');
//     }
// }
// function updateFields(data) {
//     for(let field in data) {
//         if (field == 'sprite') {
//             let psprite = document.getElementById(field).src = data[field]
//         } else {
//             let element = document.getElementById(field).innerHTML = data[field]
//         }
//     }
// }
// function clearFields() {
//     console.log('HEHEHE')
// }


module.exports = app => app.use('/', router);