const express = require("express");

const controllerStage = require("../controllers/stages-controllers");
const router = express.Router();

router.get("/:stageId", controllerStage.getStageById);

router.post("/", controllerStage.creerStage);

router.delete("/:stageId", controllerStage.supprimerStage);

module.exports = router;
