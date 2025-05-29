require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes');

const app = express();

app.use(express.json());
app.use('/api', router);

// Credencials
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

const PORT = process.env.PORT || 3000;

mongoose
  .connect(
    `mongodb+srv://${dbUser}:${dbPassword}@cluster0.0lg9ye8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    app.listen(PORT, () =>
      console.log(
        `Banco de dados conectado e servidor rodando em http://localhost:${PORT}`
      )
    );
  })
  .catch((err) => console.log(err));
