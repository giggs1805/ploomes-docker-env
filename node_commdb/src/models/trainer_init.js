const mongoose = require('../database/index')


const CreatureData = new mongoose.Schema({
    "#": {
        type: Number,
        required: true
    },
    "Name": {
        type: String,
        required: true
    },
    "Type 1": {
        type: String,
        required: true
    },
    "Type 2": {
        type: String
    },
    "Total": {
        type: Number,
        required: true
    },
    "Attack": {
        type: Number,
        required: true
    },
    "Atk.Spc": {
        type: Number,
        required: true
    },
    "Defense": {
        type: Number,
        required: true
    },
    "Def.Spc": {
        type: Number,
        required: true
    },
    "Speed": {
        type: Number,
        required: true
    },
    "Generation": {
        type: Number,
        required: true
    },
    "Legendary": {
        type: Boolean,
        required: true
    },
    "Shiny": {
        type: Boolean,
        required: true
    },
    "sprite": {
        type: String,
        required: true
    }
}, { _id: false });

const TrainerSchema = new mongoose.Schema({
    owner: {
        type: String,
        require: true
    },
    creatureData: [CreatureData]
});


const Trainer = mongoose.model('Trainer', TrainerSchema)

module.exports = Trainer;