const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const indexRouter = require('./routes/index');
const mustacheExpress = require("mustache-express");
const app = express();
const { userCounters } = require("./utils/utils");

app.engine("mustache", mustacheExpress());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'mustache');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'segredo',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 86400000
  }
}));

app.use(passport.initialize());
app.use(passport.session());





passport.use(new LocalStrategy((username, password, done) => {
  const users = [
    { id: 1, username: 'TesteA', password: '123' },
    { id: 2, username: 'TesteB', password: '123' },
    { id: 3, username: 'TesteC', password: '123' }
  ];

  const user = users.find(u => u.username === username);

  if (!user) {
    return done(null, false, { message: 'Usuário não encontrado' });
  }

  if (user.password !== password) {
    return done(null, false, { message: 'Senha incorreta' });
  }

  return done(null, user);
}));

passport.serializeUser((user, done) => {
  console.log('Serializing user:', user);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const users = [
    { id: 1, username: 'TesteA', password: '123' },
    { id: 2, username: 'TesteB', password: '123' },
    { id: 3, username: 'TesteC', password: '123' }
  ];

  const user = users.find(u => u.id === id);

  if (!user) {
    return done(new Error('Usuário não encontrado'));
  }

  done(null, user);
});

app.use((req, res, next) => {
  if (req.isAuthenticated()) {
    let userCounter = userCounters.find(counter => counter.id === req.user.id);

    if (userCounter) {
      userCounter.requests++;
    } else {
      userCounters.push({ id: req.user.id, requests: 1 });
    }
  } else {
    userCounters.push({ id: 0, requests: 1 })
  }



  next();  // Passa para o próximo middleware ou rota
});

// Roteamento principal
app.use('/', indexRouter);

// Middleware para erros
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
