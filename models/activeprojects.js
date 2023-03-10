const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const subSchema = new Schema({
    name: String,
    manager_id: String,
});

//Create Patient Sequence Schema
const activeProject = new Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    project_id: {
        type: String,
        required: [true, 'project id is required']
    },
    number_resources: {
    },
    project_manager: {
        type: [subSchema],
        default: [],
    }
});

const currentactiveProject = mongoose.model('activeProject', activeProject);
module.exports = currentactiveProject;
