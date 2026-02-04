const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// 🔑 Connexion Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// ✅ GET /projets
app.get("/projets", async (req, res) => {
  const { data, error } = await supabase
    .from("projets")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

// ✅ POST /projets
app.post("/projets", async (req, res) => {
  const nouveauProjet = req.body;

  const { error } = await supabase
    .from("projets")
    .insert([nouveauProjet]);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json({ message: "Projet ajouté avec succès" });
});

// 🚀 Lancer le serveur
app.listen(PORT, () => {
  console.log(`✅ Serveur lancé sur http://localhost:${PORT}`);
});
