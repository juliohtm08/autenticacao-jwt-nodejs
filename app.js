require('dotenv').config;
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/', (req, res) => {
  res.status(200).json({ msg: 'API funcionando!' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
  console.log(`Servidor rodando em http://localhost:${PORT}`)
);
