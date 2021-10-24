const express = require('express');
const Trainer = require('../models/trainer_init')

const router = express.Router();

const sessionTrainer = {
    owner: undefined,
    creatureData: [],
    alreadyExists: false
}

const probeTrainer = {
    owner: undefined
}

const MAX = 6


async function updateTrainer(newCapture) {
    const trainer = await Trainer.findOne({ owner: sessionTrainer.owner })
    // console.log(trainer)
    
    if(checkMax(trainer))
        return { status: 403, message: 'maximum number reached' }
    console.log('when updating, sessionTrainer is',sessionTrainer.owner)
    trainer.creatureData.push(newCapture)
    await Trainer.findOneAndUpdate({ owner: sessionTrainer.owner }, { creatureData: trainer.creatureData })
    console.log('Trainer inventory updated... returning')
    return { status: 200, message: 'pokemon added' }
}

function checkMax(trainer) {
    if(trainer.creatureData.length===MAX)
        return true
}

async function registerTrainer(trainer) {
    await Trainer.create(trainer)
    sessionTrainer.alreadyExists = true
    sessionTrainer.owner = trainer.owner
    console.log('trainer created... returning')
}

async function getTrainer(trainer) {
    const trainerFlag = await Trainer.findOne(trainer).exec()
    console.log('getTrainer\'s trainerFlag ',trainerFlag)
    if(trainerFlag)
        return true
    else
        return false
}


router.get('/', async(req, res) => {
    res.send('hi')
})

router.get('/health', (req, res) => {
    res.send('ok')
})

router.post('/:id', async(req, res) => {
    // take 3, acao!
    probeTrainer.owner = req.params.id
    if ((probeTrainer.owner)==(sessionTrainer.owner)) {
        console.log('Trainer ',sessionTrainer.owner,' unchanged')
        return res.status(200).send()
    }

    const exists = await getTrainer(probeTrainer)
    console.log('exists flag is',exists)
    if (exists) {
        sessionTrainer.owner = probeTrainer.owner
        sessionTrainer.alreadyExists = true
        sessionTrainer.creatureData = []
        console.log('Welcome back ',sessionTrainer.owner)
        return res.status(200).send()
    } else {
        sessionTrainer.creatureData = []
        sessionTrainer.alreadyExists = false
        await registerTrainer(probeTrainer)
        console.log('Session Trainer set as ',sessionTrainer.owner)
        return res.status(200).send()
    }
    // fim take 3, corta!
})

router.post('/', async(req, res) => {
    // take 3, açao!
    const newCapture = req.body
    const response = await updateTrainer(newCapture)
    return res.status(response.status).send(response.message)
    // fim do take 3, corta!
})

// Requisições GET para o JS/MongooseDB
router.get('/team', async(req, res) => {
    console.log('meu poke-time abaixo:\n')
})


module.exports = app => app.use('/', router);
