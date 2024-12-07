const express = require('express');
const app = express();
app.use(express.json());
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running in ${PORT}`);
});

let tasks = []; // banco de dados
let cont = 1;





/* ========= ROTAS ========== */
app.get('/tasks', (req, res) => {
  res.json(tasks);
});


app.post('/tasks', (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required' });
  }

  const newTask = {
    id: cont++,
    title,
    description,
    completed: false,
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});


app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  const task = tasks.find(task => task.id === parseInt(id));

  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  if (title) task.title = title;
  if (description) task.description = description;
  if (typeof completed !== 'undefined') {
    if (typeof completed !== 'boolean') {
      return res.status(400).json({ error: `Field 'completed' invalid` });
    }
    task.completed = completed;
  }

  res.json(task);
});


app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const taskIndex = tasks.findIndex(task => task.id === parseInt(id));

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Tarefa não encontrada' });
  }

  const deletedTask = tasks.splice(taskIndex, 1)[0];
  res.status(200).json(deletedTask);
});