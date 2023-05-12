const express = require("express");

const controllerStage = require("../controllers/stages-controllers");
const router = express.Router();

router.get("/:stageId", controllerStage.getCoursById);

router.post("/", controllerStage.creerCours);

router.patch("/:stageId", controllerStage.updateCours);

router.delete("/:stageId", controllerStage.supprimerCours);

module.exports = router;
