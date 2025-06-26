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
// Datos dummy para ejemplo (puedes sustituirlo por base de datos o archivo real)
const torneos = {
  "-abc123": {
    nombre: "Torneo de Verano",
    equipos: ["Equipo A", "Equipo B", "Equipo C"],
  },
  "-xyz789": {
    nombre: "Torneo Invierno",
    equipos: ["Equipo X", "Equipo Y"],
  },
};

// Ruta API para obtener datos de torneo
app.get('/api/torneos/:id', (req, res) => {
  const id = req.params.id;
  const torneo = torneos[id];
  if (torneo) {
    res.json(torneo);
  } else {
    res.status(404).json({ error: "Torneo no encontrado" });
  }
});
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
