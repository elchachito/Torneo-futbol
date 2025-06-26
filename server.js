const express = require("express");
const cors = require("cors"); // 👈 Añadido
const app = express();
const path = require("path");
const { randomUUID } = require("crypto");

app.use(cors()); // 👈 Habilita CORS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servimos archivos estáticos si hace falta
app.use(express.static("public"));

// Motor para servir HTML con reemplazo de ID
app.get("/:id", (req, res) => {
  const id = req.params.id;
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// Almacenamiento temporal en memoria (se borra al reiniciar)
const torneos = {};

// API para obtener torneo
app.get("/api/torneos/:id", (req, res) => {
  const torneo = torneos[req.params.id];
  if (!torneo) return res.status(404).json({ error: "Torneo no encontrado" });
  res.json(torneo);
});

// API para crear torneo
app.post("/api/torneos", (req, res) => {
  const { nombre, equipos } = req.body;

  if (!nombre || !equipos || !Array.isArray(equipos)) {
    return res.status(400).json({ error: "Datos inválidos" });
  }

  const id = "-" + randomUUID().slice(0, 6); // Tipo -a1b2c3
  torneos[id] = { nombre, equipos };
  console.log(`Torneo creado con ID ${id}`);
  res.json({ enlace: `https://torneo-futbol-production.up.railway.app/${id}` });
});

// Servidor corriendo
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
