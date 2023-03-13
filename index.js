const express = require('express');
const app = express();
const port = 3000;
var bodyParser = require('body-parser')
var cors = require('cors')
var fs = require('fs');
const mongoose = require('mongoose');
app.use(cors())
app.use(express.json());
const DevResourceSchemaRecord = require('../ResourceBackend/models/resources');
const ManagerSchemaRecord = require('../ResourceBackend/models/managers');
const ActiveProjectSchemaRecord = require('../ResourceBackend/models/activeprojects');

var db_link
db_link = 'mongodb://localhost:27017/resource'

// connect with the mongodb database
mongoose.connect(db_link, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("Connected to Database");
}).catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
});

// GET api to fetch all the resouces.
app.get('/api/getResources', async (req, res) => {
    try {
        const resources = await DevResourceSchemaRecord.find();
        res.send(resources);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
});

// POST api to create new resouces.
app.post('/addResource', async function (req, res, next) {
    var articles = await DevResourceSchemaRecord.count();
    var updateObj = {
        'name': req.body.name,
        'resource_id': `USER-${articles + 1}`
    }
    DevResourceSchemaRecord.create(updateObj).then(function (record) {
        res.send(record);
    }).catch(next);
})


// GET api to fetch all the resouces.
app.get('/api/getManager', async (req, res) => {
    try {
        const managersDocuments = await ManagerSchemaRecord.find();
        res.send(managersDocuments);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
});

// POST api to create new managers.
app.post('/addManagers', async function (req, res, next) {
    var managersCount = await ManagerSchemaRecord.count();
    var updateObj = {
        'name': req.body.name,
        'manager_id': `MANAGER-${managersCount + 1}`
    }
    ManagerSchemaRecord.create(updateObj).then(function (record) {
        res.send(record);
    }).catch(next);
})

//PUT API to assign managers Project
app.put('/api/assignManager', async function (req, res, next) {
    var findManager = await ManagerSchemaRecord.find({ manager_id: req.body.manager_id })
    var findProject = await ActiveProjectSchemaRecord.find({ project_id: req.body.project_id })
    var proj_value = findManager[0].project_list
    if (proj_value[0].project_id == req.body.project_id) {
        res.status(400).send({ message: "Project is already assigned to this Project Manager" })
    } else {
        if (proj_value.length != 0) {
            for (let i = 0; i < proj_value.length; i++) {
                if (proj_value[i].project_id == req.body.project_id) {
                    return res.status(404).send({ error: 'Project Already Assigned' });
                } else {
                    findManager[0].project_list.push(findProject[0])
                    findProject[0].project_manager.push(findManager[0])
                    ActiveProjectSchemaRecord.findOneAndUpdate(
                        { project_id: req.body.project_id }, // The query to find the document and object to update
                        { $set: findProject[0] }, // The update operation
                        { new: true }
                    ).then(function (value) {
                        res.send(value)
                    }).catch(next);

                    ManagerSchemaRecord.findOneAndUpdate(
                        { manager_id: req.body.manager_id }, // The query to find the document and object to update
                        { $set: findManager[0] }, // The update operation
                        { new: true }
                    ).then(function (record) {
                        res.send(record)
                    }).catch(next);
                }
            }
        } else {
            findManager[0].project_list.push(findProject[0])
            findProject[0].project_manager[0]=(findManager[0])
            ActiveProjectSchemaRecord.findOneAndUpdate(
                { project_id: req.body.project_id }, // The query to find the document and object to update
                { $set: findProject[0] }, // The update operation
                { new: true }
            ).then(function (value) {
                res.send(value)
            }).catch(next);
            ManagerSchemaRecord.findOneAndUpdate(
                { manager_id: req.body.manager_id }, // The query to find the document and object to update
                { $set: findManager[0] }, // The update operation
                { new: true }
            ).then(function (record) {
                res.send(record)
            }).catch(next);
        }
    }
})

//API to get list of projects with the assigned resources.
app.get('/api/activeProjects', async (req, res) => {
    try {
        const activeProjectDocuments = await ActiveProjectSchemaRecord.find();
        res.send(activeProjectDocuments);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
});

app.post('/api/createProjects', async function (req, res, next) {
    var projectCount = await ActiveProjectSchemaRecord.count();
    var updateObj = {
        'name': req.body.name,
        'project_id': `PROJECT-${projectCount + 1}`,
    }
    ActiveProjectSchemaRecord.create(updateObj).then(function (record) {
        res.send(record);
    }).catch(next);
})

// app.put('/api/updateProjects',async function (req, res, next) {
//     var projectCount =  await ActiveProjectSchemaRecord.find(req.body.project_id).then(function (rec))
//     var updateObj= {
//         'name':req.body.name,
//         'project_id':`MANAGER-${projectCount+1}`,
//         'number_resources':req.body.number_resources
//     }
//     ActiveProjectSchemaRecord.create(updateObj).then(function (record) {
//         res.send(record);
//     }).catch(next);
// })



app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
});