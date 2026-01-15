const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors()); // autorise les requêtes du front
app.use(express.json()); // parse le body JSON

const DATA_FILE = 'projets.json';

// POST : enregistrer un projet
app.post('/projets', (req, res) => {
  const nouveauProjet = req.body;
  let projets = [];

  if (fs.existsSync(DATA_FILE)) {
    projets = JSON.parse(fs.readFileSync(DATA_FILE));
  }

  projets.push(nouveauProjet);
  fs.writeFileSync(DATA_FILE, JSON.stringify(projets, null, 2));
  res.status(201).json({ message: 'Projet enregistré ✅' });
});

// GET : récupérer les projets
app.get('/projets', (req, res) => {
  if (!fs.existsSync(DATA_FILE)) {
    return res.json([]);
  }
  const projets = JSON.parse(fs.readFileSync(DATA_FILE));
  res.json(projets);
});

// Lancer le serveur
app.listen(PORT, () => {
  console.log(`✅ Serveur lancé sur http://localhost:${PORT}`);
});
