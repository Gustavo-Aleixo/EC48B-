import express from 'express';
import mustacheExpress from 'mustache-express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.render('index', {
    title: 'Pagina Inicial',
    links: [
      { url: '/inverter-texto?texto=exemplo', label: 'Inverter Texto' },
      { url: '/login', label: 'Login' }
    ]
  });
});

app.get('/inverter-texto', (req, res) => {
  const { texto } = req.query;
  let textoInvertido = null;
  if (texto) {
    textoInvertido = texto.split('').reverse().join('');
  }
  res.render('inverter', { texto, textoInvertido });
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', (req, res) => {
  const { usuario, senha } = req.body;
  let mensagem = 'Usuário e senha são obrigatórios.';

  if (usuario && senha) {
    if (senha === usuario + usuario) {
      mensagem = `Usuário: ${usuario}<br>Senha: ${senha}<br>Acesso permitido.`;
    } else {
      mensagem = `Usuário: ${usuario}<br>Acesso negado. A senha não é válida.`;
    }
  }

  res.render('login', { usuario, senha, mensagem });
});

app.listen(port, () => {
  console.log(`App rodando em http://localhost:${port}`);
});
