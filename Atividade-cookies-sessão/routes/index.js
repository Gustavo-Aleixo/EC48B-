const express = require('express');
const passport = require('passport');
const { taskSchema, getPriorities, getPriorityColor, allTasks, userCounters } = require("../utils/utils");
const router = express.Router();


// Home
router.get('/', (req, res) => {
  const userName = req.session.userName || '';
  res.render('index', { userName });
});

// Salva o nome do usuário na sessão
router.post('/salvauser', (req, res) => {
  const { name } = req.body;
  req.session.userName = name;
  res.redirect('/');
});

// Página Todo
router.get('/todo', (req, res) => {
  const error = req.session.error;
  req.session.error = null;

  let tasks;
  if (req.isAuthenticated()) {
    req.session.tasks = allTasks.filter(task => task.userId === req.user.id);
    tasks = req.session.tasks;
  } else {
    tasks = allTasks;
  }

  const priorities = getPriorities();
  res.render('todo', {
    tasks,
    user: req.user,
    priorities,
    error
  });
});


// Rota POST para criar tarefas
router.post('/tarefas', (req, res) => {
  const { error, value } = taskSchema.validate(req.body);

  if (error) {
    req.session.error = "Dados da tarefa incompletos.";
    return res.redirect('/todo');
  }

  const { nome, prioridade } = value;
  const userId = req.user.id;

  const newTask = {
    id: Date.now(),
    name: nome,
    cor: getPriorityColor(prioridade),
    userId: userId
  };

  req.session.tasks.push(newTask)
  allTasks.push(newTask);

  res.redirect("/todo");
});


//Contador de requisições
router.get("/contador", (req, res) => {
  const totalRequests = userCounters.reduce((acc, counter) => acc + counter.requests, 0);
  const userCounter = userCounters.find(counter => counter.id === req.user?.id);
  const userRequests = userCounter ? userCounter.requests : 0;

  res.render("contador", {
    totalRequests,
    userRequests,
  });
});


// Deletar tarefa
router.get("/tarefas/del/:id", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/todo");
  }

  const { id } = req.params;
  const userId = req.user.id;

  const userTasks = allTasks.filter(task => task.userId === userId);
  const taskIndex = userTasks.findIndex(task => task.id == id);

  if (taskIndex >= 0) {
    const task = allTasks.find(task => task.id == id && task.userId === userId);

    if (task) {
      const taskIndexInAllTasks = allTasks.indexOf(task);
      if (taskIndexInAllTasks >= 0) {
        allTasks.splice(taskIndexInAllTasks, 1);
      }
    }
  }

  const updatedTasks = allTasks.filter(task => task.userId === userId);
  req.session.tasks = updatedTasks;

  res.redirect("/todo");
});

// Gerador numero random
router.get('/random', (req, res) => {
  let randomNumber = Math.floor(Math.random() * 100) + 1;
  res.cookie('randomNumber', randomNumber, { maxAge: 86400000, httpOnly: true });
  res.render('random', { randomNumber });
});

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {

    if (err) {
      return next(err);
    }

    if (!user) {
      req.session.error = "Credenciais inválidas.";
      return res.redirect('/todo');
    }

    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }

      const userTasks = allTasks.filter(task => task.userId === user.id);
      req.session.tasks = userTasks;

      return res.redirect('/todo');
    });
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) { return next(err); }
    res.redirect('/todo');
  });
});



module.exports = router;