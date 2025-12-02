const express = require('express');
const app = express();

app.use(express.json());

let todos= [];
let currentID = 1;

app.post('/todo', (req, res) => {
    const {tittle, description, status} = req.body;

    if(!tittle){
        return res.status(400).json({error: "Tittle is required"})
    }
    if(status && status !== 'pending' && status !== 'completed'){
        return res.status(400).json({error: "Invalid status value"})
    }

    const newTodo = {
        id: currentID++,
        tittle,
        description: description || '', 
        status: status || 'pending'
    };
    todos.push(newTodo);

    return res.status(201).json({
        status: 'success',
        todo: newTodo
    });
});

app.get("/todo", (req, res) => {
    return res.json({
        status: 'success',
        todos,
    })
})

app.get("/todo/:id", (req, res) => {
  const id = Number(req.params.id);

  const todo = todos.find((t) => t.id === id);

  if (!todo) {
    return res.status(404).json({ error: "Todo not found" });
  }

  return res.json({
    status: "success",
    todo,
  });
});

app.put("/todo/:id", (req, res) => {
  const id = Number(req.params.id);
  const { title, description, status } = req.body;

  const todo = todos.find((t) => t.id === id);

  if (!todo) {
    return res.status(404).json({ error: "Todo not found" });
  }

  // validations
  if (status && status !== "pending" && status !== "completed") {
    return res.status(400).json({ error: "Invalid status value" });
  }
  // update fields
  if (title) todo.title = title;
  if (description) todo.description = description;
  if (status) todo.status = status;

  return res.json({
    status: "success",
    todo,
  });
});
app.delete("/todo/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = todos.findIndex((t) => t.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Todo not found" });
  }

  todos.splice(index, 1);

  return res.json({
    status: "success",
    message: "Todo deleted",
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});