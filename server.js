// server.js
const express = require('express');
const app = express();

// Permitir CORS para pruebas de freeCodeCamp
const cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));

// Servir archivos estáticos (como index.html)
app.use(express.static('public'));

// Ruta raíz (opcional)
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Ruta principal del API
app.get('/api/:date?', (req, res) => {
  const { date } = req.params;

  let parsedDate;

  // Si no se proporciona parámetro, usar fecha actual
  if (!date) {
    parsedDate = new Date();
  } else if (!isNaN(date)) {
    // Si el parámetro es numérico, tratar como timestamp en milisegundos
    parsedDate = new Date(parseInt(date));
  } else {
    // Si es una cadena, tratar de parsear como fecha estándar
    parsedDate = new Date(date);
  }

  // Validación de fecha inválida
  if (parsedDate.toString() === 'Invalid Date') {
    return res.json({ error: 'Invalid Date' });
  }

  // Respuesta válida
  res.json({
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString(),
  });
});

// Escuchar en el puerto asignado por Render o 3000 localmente
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
