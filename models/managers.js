const mongoose = require('mongoose');
const Schema = mongoose.Schema;


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
  },
  resources_list:{
  }
});



const projectManagers = mongoose.model('managers',managersSchema);
module.exports = projectManagers;
