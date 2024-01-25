const Item = require("./db")
const express = require("express");
const mongoose = require('mongoose')
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

const dbURL = 'mongodb+srv://list_user:user123@cluster0.f88bnq0.mongodb.net/ToDoList?retryWrites=true&w=majority'
mongoose.connect(dbURL)
    .then((result) =>{
        app.listen(port)
        console.log("server started")
    })
    .catch((e) => console.log(e))


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 


app.get("/tasks", (req, res) => {
    Item.find()
        .then((result) => {
            res.send(result)
        })
        .catch((e) => {
            console.log(e)
        })
})

app.get("/tasks/:id", (req, res) => {
    const taskId = req.params.id;
    Item.findById(taskId)
        .then((result) => {
           res.send(result)
        })
        .catch((e) => {
            console.log(e)
        })
})

app.post("/tasks", (req, res) => {
    const item = Item(req.body)

    item.save()
        .then((result) => {
            res.redirect("/tasks")
        })
        .catch((e) => {
            console.log(e)
        })
})

app.put("tasks/put/:id", (req, res) => {
    const taskID = req.params.id;
    const updatedData = req.body; 

    Item.findByIdAndUpdate(taskID, updatedData, { new: true })
        .exec()
        .then(updatedItem => {
            res.redirect(`/tasks/${taskID}`);
        })
        .catch((e) => {
            console.log(e);
        });
});

app.delete("/tasks/delete/:id", (req, res) => {
    const taskID = req.params.id

    Item.findByIdAndDelete(taskID)
        .exec()
        .then((result) => {
            res.redirect(`/tasks`);
        })
        .catch((e) => {
            console.log(e);
        });
})
