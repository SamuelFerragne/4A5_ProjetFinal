const express = require("express");

const controllerStage = require("../controllers/stage-controllers");
const router = express.Router();

router.get("/:etudiantId", controllerStage.getCoursById);

router.post("/", controllerStage.creerCours);

router.patch("/:etudiantId", controllerStage.updateCours);

router.delete("/:etudiantId", controllerStage.supprimerCours);

module.exports = router;
