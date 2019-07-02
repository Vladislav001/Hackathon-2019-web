const mongoose = require('mongoose');

const exampleSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

exampleSchema.virtual('exampleId').get(function () {
    return this._id;
});

let Example = mongoose.model('Example', exampleSchema);

module.exports = Example;