const express = require("express");

const controllerEtudiant = require("../controllers/etudiants-controllers");
const router = express.Router();

router.get("/:etudiantId", controllerEtudiant.getEtudiantById);

router.post("/", controllerEtudiant.creerEtudiant);

router.patch("/:etudiantId", controllerEtudiant.updateEtudiant);

router.delete("/:etudiantId", controllerEtudiant.supprimerEtudiant);

module.exports = router;
