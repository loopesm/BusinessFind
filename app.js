const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const businessesRoutes = require('./src/routes/businesses');

dotenv.config();

const app = express();

// Middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rotas para buscar empresas
app.use('/', businessesRoutes);

// Configurando a view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// Rota para a página principal
app.get('/', (req, res) => {
  res.render('index');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
