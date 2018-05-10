const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
// const route = require('./routes.js');

const app = express();
app.use(bodyparser.json());

mongoose.connect('mongodb://localhost/restful_app');
mongoose.promise = global.Promise;

const TaskSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, default:""},
    completed: {type: Boolean, default: false},
}, {timestamps: true}
);

const Tasks = mongoose.model('tasks', TaskSchema);

// get all data from dictionary
app.get('/', function(req, res){
    Tasks.find({}, function(errs, data){
        if(errs){
            console.log('you got errs');
            res.json(errs);
        }
        else{
            console.log('you made it!')
            res.json(data);
        }
    })

});

//create the data in mongo
app.post('/tasks', function(req, res){
    let bob = new Tasks({
        title: req.body.title,
        description: req.body.description
    });
    bob.save(function(errs){
        if(errs){
            console.log('u messed up here');
            res.json(errs);
        }
        else{
        console.log('your data below');
        console.log(data._id);
        res.redirect('/tasks/' + data._id);
        }
    });
})

// get 1 task by id
app.get('/tasks/:id', function(req, res){
    Tasks.findOne({_id:req.params.id}, function(errs, data){
        if(errs){
            console.log('outta here, you f-ed up');
            res.json(errs);
        }
        else{
            console.log('gucci')
            res.json(data);
        }
    })
});

//update 1 task
app.put('/tasks/:id', function(req,res){
    let updatedInfo = {
        'title': req.body.title,
        'description': req.body.description,
        'completed': req.body.completed
    }
    Tasks.updatedOne({_id: req.params.id}, updatedInfo, function(errs, data){
        if (errs){
            console.log('damn!!');
            res.json(errs);
        }
        else{
            console.log('made the updated successfully');
            console.log(data);
            res.json(data);
        }
    })
});

app.delete('/tasks/:id', function(req, res){
    Tasks.deleteOne({_id: req.params.id}, function(errs, data){
        if (errs){
            console.log('damn -- missed');
            res.json(errs);
        }
        else{
            console.log('we deleted successfully');
            console.log(data);
            res.json(data);
        }
    })
});


app.listen(8800, function(){
    console.log('ah oh!')
});
