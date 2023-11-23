const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
    username: {
        type: String,
        required: [true, 'name field is required']
    },
    score:{
        type: String,
        required: [true, 'score is required']
    },
    date : {
        type: Date,
        default : Date.now
    }
});

const Player = mongoose.model('players',PlayerSchema);

module.exports = {
    Player
}