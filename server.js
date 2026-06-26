
const express = require('express');
const path = require('path');
const db = require('./src/infrastructure/database/db');
const PasswordPolicy = require('./src/domain/auth/PasswordPolicy');
const SessionManager = require('./src/infrastructure/security/SessionManager');
const RegisterUser = require('./src/application/auth/RegisterUser');
const LoginUser = require('./src/application/auth/LoginUser');
const CreatePost = require('./src/application/board/CreatePost');
const GetPosts = require('./src/application/board/GetPosts');
const DeletePost = require('./src/application/board/DeletePost');

const app = express();
const sessionManager = new SessionManager();
const registerUser = new RegisterUser({ db, passwordPolicy: new PasswordPolicy() });
const loginUser = new LoginUser({ db, sessionManager });
const createPost = new CreatePost({ db });
const getPosts = new GetPosts({ db });
const deletePost = new DeletePost({ db });

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/auth/register', (req, res) => {
  try {
    const result = registerUser.execute(req.body);
    res.status(201).json({ ok: true, data: result });
  } catch (error) {
    res.status(400).json({ ok: false, message: error.message });
  }
});

app.post('/api/auth/login', (req, res) => {
  try {
    const result = loginUser.execute(req.body);
    res.json({ ok: true, data: result });
  } catch (error) {
    res.status(401).json({ ok: false, message: error.message });
  }
});

app.get('/api/posts', (req, res) => {
  res.json({ ok: true, data: getPosts.execute() });
});

app.post('/api/posts', (req, res) => {
  try {
    const result = createPost.execute(req.body);
    res.status(201).json({ ok: true, data: result });
  } catch (error) {
    res.status(400).json({ ok: false, message: error.message });
  }
});

app.delete('/api/posts/:id', (req, res) => {
  try {
    const result = deletePost.execute({ id: req.params.id, userId: req.body.userId });
    res.json({ ok: true, data: result });
  } catch (error) {
    res.status(400).json({ ok: false, message: error.message });
  }
});

app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(3000, () => console.log('http://localhost:3000'));
