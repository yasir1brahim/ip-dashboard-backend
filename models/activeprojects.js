const mongoose = require('mongoose');
const Schema = mongoose.Schema;


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
    }
});

const currentactiveProject = mongoose.model('activeProject', activeProject);
module.exports = currentactiveProject;
