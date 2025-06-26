const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

const PORT = process.env.PORT || 8080;

// Servir archivos estáticos (si los necesitas)
app.use(express.static('public'));

// Ruta principal de prueba
app.get('/', (req, res) => {
  res.send('Servidor activo. Escribe un ID para ver el torneo.');
});

// Ruta dinámica para mostrar el torneo
app.get('/:id', (req, res) => {
  const filePath = path.join(__dirname, 'views', 'index.html');
  fs.readFile(filePath, 'utf8', (err, html) => {
    if (err) {
      res.status(500).send('Error al cargar el torneo');
      return;
    }

    const rendered = html.replace('{{ID}}', req.params.id);
    res.send(rendered);
  });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
