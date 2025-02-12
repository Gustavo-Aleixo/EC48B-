const express = require('express');
const Task = require('./models/Task');
const sequelize = require('./config/database');
const app = express();
app.use(express.json());


/**
 * Sincronizar o modelo com o banco de dados
 * Usando o "force: true", o banco é zerado toda vez que a aplicação é encerrada 
 */
sequelize.sync({ force: true }).then(() => {
  console.log('Banco de dados sincronizado');
});


/**
 * ============ Rota 1 ============ 
 * Rota para criar uma tarefa
 */
app.post('/tasks', async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


/**
 * ============ Rota 2 ============ 
 * Rota para listar todas as tarefas
 */
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


/**
 * ============ Rota 3 ============ 
 * Rota para excluir uma tarefa
 */
app.delete('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (task) {
      await task.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Tarefa não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});