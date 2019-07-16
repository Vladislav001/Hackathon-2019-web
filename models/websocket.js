const mongoose = require('mongoose');

const websocketSchema = mongoose.Schema({
    received_message: {
        type: String
    },
});

module.exports = mongoose.model('Websocket', websocketSchema);