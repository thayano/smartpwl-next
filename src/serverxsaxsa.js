const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cookieParser());

// Rota de autenticação para gerar o token
app.post('/api/login', (req, res) => {
  // Verifique as credenciais do usuário e gera o token
  const user = { id: 1, username: 'username' };
  const token = jwt.sign(user, 'secret_key');
  res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict' });
  res.json({ token });
});

// Rota para verificar a sessão e validar as informações do navegador
app.get('/api/session', (req, res) => {
  // Obtém o token do cookie
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: 'Sessão inválida' });
  }

  try {
    // Verifica e decodifica o token
    const decoded = jwt.verify(token, 'secret_key');
    const { id, username } = decoded;

    // Verifica as informações do navegador
    const userAgent = req.headers['user-agent'];
    const clientOS = req.headers['client-os'];

    // Verifica se as informações do navegador são válidas (exemplo simplificado)
    if (userAgent !== decoded.userAgent || clientOS !== decoded.clientOS) {
      return res.status(401).json({ error: 'Informações do navegador inválidas' });
    }

    // Verifica se a sessão ainda é válida no servidor (exemplo simplificado)
    // Você pode usar um mecanismo de armazenamento de sessão adequado, como Redis ou um banco de dados
    // Aqui estamos apenas verificando se o ID do usuário é igual ao valor esperado
    if (id === 1) {
      return res.json({ id, username });
    } else {
      return res.status(401).json({ error: 'Sessão inválida' });
    }
  } catch (error) {
    return res.status(401).json({ error: 'Sessão inválida' });
  }
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
});
