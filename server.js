// server.js
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

// Middleware para habilitar CORS (si lo necesitas)
const cors = require('cors');
app.use(cors());

// Ruta base, puedes poner una bienvenida simple
app.get('/', (req, res) => {
  res.send('Timestamp Microservice');
});

// API endpoint con parámetro opcional :date
app.get('/api/:date?', (req, res) => {
  let dateString = req.params.date;

  // Si no se envía parámetro, usa la fecha actual
  if (!dateString) {
    let now = new Date();
    return res.json({
      unix: now.getTime(),
      utc: now.toUTCString()
    });
  }

  // Si el dateString es solo números (timestamp unix en ms), parsearlo como número
  // Ejemplo: 1451001600000
  if (/^\d+$/.test(dateString)) {
    dateString = parseInt(dateString);
  }

  const date = new Date(dateString);

  // Validar fecha inválida
  if (date.toString() === 'Invalid Date') {
    return res.json({ error: "Invalid Date" });
  }

  // Responder con objeto JSON correcto
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
