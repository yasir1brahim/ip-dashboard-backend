const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//Create Patient Sequence Schema
const assignedSchema = new Schema({
  name:{
    type:String,
    required: [true, 'name is required']
  },
  project_id:{
    type:String,
    required: [true, 'project id is required']
  },project_name:{
    type:String,
    required: [true, 'project name is required']
  },manager_id:{
    type:String,
    required: [true, 'manager id is required']
  },managerName :{
    type:String,
    required: [true, 'manager name is required']
  }
});

const assignProject = mongoose.model('assignedproject',assignedSchema);
module.exports = assignProject;
