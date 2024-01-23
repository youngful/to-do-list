const db = require("./db")
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

app.get("/tasks", (req, res) => {
    db.all("SELECT * FROM tasks", (err, tasks) => {
        if(err){
            res.status(500).json({
                error: err.message
            })
            return
        }
        res.json(tasks)
    })
})

app.get("/tasks/array", (req, res) => {
    db.all("SELECT * FROM tasks", (err, tasks) => {
        if(err){
            res.status(500).json({
                error: err.message
            })
            return
        }
        const a = {};
        const taskCounts = {};

        tasks.forEach(task => {
            const title = task.title;
            taskCounts[title] = (taskCounts[title] || 0) + 1;
        });

        res.json(taskCounts)
    })
})


app.get("/tasks/:id", (req, res) => {
    const taskId = req.params.id;
    db.all("SELECT * FROM tasks WHERE id = ?", [taskId], (err, task) => {
        if(err){
            res.status(500).json({
                error: err.message
            })
            return
        }
        if (!task) {
            res.status(404).json({ error: "Task not found" });
            return;
        }
        res.json(task)
    })
})

app.post("/tasks", (req, res) => {
    const {title, description, completed} = req.body

    db.run(
        "INSERT INTO tasks (title, description, completed) VALUES (?, ?, ?)", [title, description, completed], 
    
        function(err){{
            if (err) {
                res.status(500).json({ error: err.message });
                return;
              }
              res.status(201).json({ id: this.lastID });
        }}
    )
})

app.put("/tasks/:id", (req, res) => {
    const taskID = req.params.id
    const {title, description, completed} = req.body

    db.run(
        "UPDATE tasks SET title = ?, description = ?, completed = ? WHERE id = ?", [title, description, completed],
        function(err){{
            if (err) {
                res.status(500).json({ error: err.message });
                return;
              }
              res.status(201).json({ message: `Task updated successfully with id:${taskID}` });
        }}
    )
})

app.delete("/tasks/:id", (req, res) => {
    const taskID = req.params.id
    
    db.run(
        "DELETE FROM tasks WHERE id = ?", [taskID], (err) =>{
            if (err) {
                res.status(500).json({ error: err.message });
                return;
              }
              res.json({ message: `Task deleted successfully with id:${taskID}` });
        }
    )
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
}); 