const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const businessRoutes = require('./src/routes/businesses');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;

// Configura o EJS como motor de visualização
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// Serve arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Configura as rotas
app.use('/', businessRoutes);

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});
