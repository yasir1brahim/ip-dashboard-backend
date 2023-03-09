const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//Create Patient Sequence Schema
const DevResourceSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    resource_id: {
        type: String,
        required: [true, 'id is required']
    },
    projectManager: {
    },
    projectAssigned: {
    }
});

const DevResource = mongoose.model('devresourceschema', DevResourceSchema);
module.exports = DevResource;
