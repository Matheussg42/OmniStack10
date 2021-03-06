require('dotenv/config');
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require('http');

const routes = require("./routes");
const { setupWebsocket } = require("./websocket");

const app = express();
const server = http.Server(app);

setupWebsocket(server);

mongoose.connect(process.env.MONGODB_CONNECTION_STRING,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

app.use(cors());
app.use(express.json());
app.use(routes);

// Métodos HTTP: GET, POST, PUT, DELETE

// TIpos de parâmetros:

// Query Params: request.query (Filtros, ordenação, paginação ...)
// Route Params: request.params (Identificar recurso na alteração ou remoção)
// Body: request.body (Dados para criação ou alteração de um registro)

// MongoDB (Não-relacionado)

server.listen(3333);
