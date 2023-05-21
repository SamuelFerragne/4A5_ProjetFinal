const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const stageSchema = new Schema({
  nomContact: { type: String, required: true },
  courrielContact: { type: String, required: true },
  telephoneContact: { type: String, required: true },
  entreprise: { type: String, required: true },
  adresse: { type: String, required: true },
  type: { type: String, required: true },
  nbPostesDisponible: { type: Number, required: true },
  description: { type: String, required: true },
  etudiants: [
    { type: mongoose.Types.ObjectId, required: true, ref: "Etudiant" },
  ],
});

module.exports = mongoose.model("Stage", stageSchema);
