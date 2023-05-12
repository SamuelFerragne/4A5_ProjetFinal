const express = require("express");

const controllerEtudiant = require("../controllers/etudiants-controllers");
const router = express.Router();

router.get("/:etudiantId", controllerEtudiant.getCoursById);

router.post("/", controllerEtudiant.creerCours);

router.patch("/:etudiantId", controllerEtudiant.updateCours);

router.delete("/:etudiantId", controllerEtudiant.supprimerCours);

module.exports = router;
