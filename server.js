const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;
const APP_URL = process.env.APP_URL || 'http://localhost:' + PORT;

app.use(cors());
app.use(express.json());

const torneos = {};

app.post('/api/torneos', (req, res) => {
  const { nombre, equipos } = req.body;
  if (!nombre || !equipos || equipos.length < 2) {
    return res.status(400).json({ error: 'Datos inválidos' });
  }

  const id = uuidv4();
  const partidos = [];
  for (let i = 0; i < equipos.length; i++) {
    for (let j = i + 1; j < equipos.length; j++) {
      partidos.push({ local: equipos[i], visitante: equipos[j], golesLocal: null, golesVisitante: null });
    }
  }

  torneos[id] = { id, nombre, equipos, partidos, creado: new Date() };

  res.json({ id, url: `${APP_URL}/torneo/${id}` });
});

app.get('/api/torneos/:id', (req, res) => {
  const torneo = torneos[req.params.id];
  if (!torneo) {
    return res.status(404).json({ error: 'Torneo no encontrado' });
  }
  res.json(torneo);
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
