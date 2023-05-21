const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const etudiantSchema = new Schema({
  DA: { type: String, required: true },
  nom: { type: String, required: true },
  courriel: { type: String, required: true },
  profil: { type: String, required: true },
  stage: { type: mongoose.Types.ObjectId, ref: "Stage" },
});

module.exports = mongoose.model("Etudiant", etudiantSchema);
