const express = require('express');
const jwt = require('jsonwebtoken');
const randomQuote = require('random-quotes').default;

const app = express();
const port = 3000;
const SECRET_KEY = 'senhasecreta';

app.use(express.json());
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});



/* ============ Rota 1 ============ */
app.get('/generate-token', (req, res) => {
  const quote = randomQuote();
  const message = quote.body;
  const token = jwt.sign({ message }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ token });
});

/* ============ Rota 2 ============ */
app.post('/decode-token', (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: 'Token é obrigatório' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    res.json({ message: decoded.message });
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' });
  }
});