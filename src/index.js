const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

mongoose.connect('mongodb+srv://matheus:omnistack@cluster0-9y8nv.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(express.json());
app.use(routes)

// Métodos HTTP: GET, POST, PUT, DELETE

// TIpos de parâmetros:

// Query Params: request.query (Filtros, ordenação, paginação ...)
// Route Params: request.params (Identificar recurso na alteração ou remoção)
// Body: request.body (Dados para criação ou alteração de um registro)

// MongoDB (Não-relacionado)

app.listen(3333);