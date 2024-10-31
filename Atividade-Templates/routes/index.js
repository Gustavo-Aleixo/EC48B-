var express = require('express');
var Task = require("../model/Tasks");
var TaskSchema = require("../validators/TaskValidator");
const Joi = require("joi");
var router = express.Router();

function getPriorities(selectedPriority) {
  const priorities = ["Baixa", "Média", "Alta"];
  return priorities.map((priority) => ({
    value: priority,
    isSelected: priority === selectedPriority
  }));
}

/* GET home page. */
router.get('/', function (req, res, next) {
  if (Task.list().length == 0) {
    Task.new("Tarefa 1", "Baixa");
    Task.new("Tarefa 2", "Média");
  }

  let obj = Task.getElementById(req.query.tid);
  const priorities = getPriorities(obj ? obj.prioridade : null);
  res.render('index', { tasks: Task.list(), task: obj, priorities: priorities });
});

router.get('/tasks/list', (req, res) => {
  const tasks = Task.list().sort((a, b) => a.name.localeCompare(b.name));
  res.render('tasksList', { tasks });
});

router.get('/tasks/count', function (req, res) {
  const taskCount = Task.list().length;
  res.render('tasksCount', { taskCount });
});

router.post("/tarefas", function (req, res) {
  const { error, value } = TaskSchema.validate(req.body);
  console.log("value = ", value)

  if (error) {
    const priorities = getPriorities(req.body.prioridade);
    res.render('index', { tasks: Task.list(), erro: "Dados incompletos", priorities });
    return;
  }

  const { id, nome, prioridade } = value;
  if (id === undefined) {
    Task.new(nome, prioridade);
  } else {
    Task.update(id, nome, prioridade);
  }

  res.redirect("/");
});

router.get("/tarefas/del/:id", function (req, res) {
  const { id } = req.params;
  const { error, value } = Joi.number().integer().greater(0).validate(id);

  if (error || !Task.delete(value)) {
    res.send("Falha ao excluir uma tarefa");
    return;
  }
  res.redirect("/");
});

// Igual a de cima, porem redireciona para a página de lista de tarefas
router.get("/tarefas/del2/:id", function (req, res) {
  const { id } = req.params;
  const { error, value } = Joi.number().integer().greater(0).validate(id);

  if (error || !Task.delete(value)) {
    res.send("Falha ao excluir uma tarefa");
    return;
  }

  res.redirect("/tasks/list");
});


module.exports = router;
