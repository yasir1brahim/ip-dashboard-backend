const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const subSchema = new Schema({
    name: String,
    project_id: String,
    number_resources:[]
});
//Create Patient Sequence Schema
const managersSchema = new Schema({
  name:{
    type:String,
    required: [true, 'name is required']
  },
  manager_id:{
    type:String,
    required: [true, 'id is required']
  },
  project_list:{
    type: [subSchema],
    default: [],
  },
  resources_list:{
  }
});





const projectManagers = mongoose.model('managers',managersSchema);
module.exports = projectManagers;
