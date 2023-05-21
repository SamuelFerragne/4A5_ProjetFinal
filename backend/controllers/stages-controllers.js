const HttpErreur = require("../models/http-erreur");

const { v4: uuidv4 } = require("uuid");

const Etudiant = require("../models/etudiant");
const Stage = require("../models/stage");

const getStageById = async (requete, reponse, next) => {
  const stageId = requete.params.stageId;
  let stage;
  try {
    stage = await Stage.findById(stageId);
  } catch (err) {
    return next(new HttpErreur("Erreur lors de la récupération du stage", 500));
  }
  if (!stage) {
    return next(new HttpErreur("Aucun stage trouvé pour l'id fourni", 404));
  }
  reponse.json({ stage: stage.toObject({ getters: true }) });
};

const getStages = async (requete, reponse, next) => {
  let stages;
  try {
    stages = await Stage.find();
  } catch (err) {
    return next(new HttpErreur("Erreur lors de la récupération des stages", 500));
  }
  if (!stages) {
    return next(new HttpErreur("Aucun stage trouvé", 404));
  }
  reponse.json({ stages: stages.map(stage => stage.toObject({ getters: true })) });

};

const creerStage = async (requete, reponse, next) => {
  const {
    nomContact,
    courrielContact,
    entreprise,
    adresse,
    type,
    nbPostesDisponible,
    description,
  } = requete.body;
  const nouveauStage = new Stage({
    nomContact,
    courrielContact,
    entreprise,
    adresse,
    type,
    nbPostesDisponible,
    description,
  });

  try {
    await nouveauStage.save();
  } catch (err) {
    const erreur = new HttpErreur("Création du stage échoué", 500);
    return next(erreur);
  }
  reponse.status(201).json({ stage: nouveauStage });
};

const supprimerStage = async (requete, reponse, next) => {
  const stageId = requete.params.stageId;
  let stage;
  try {
    stage = await Stage.findById(stageId).populate("etudiants");
  } catch {
    return next(new HttpErreur("Erreur lors de la suppression du stage", 500));
  }
  if (!stage) {
    return next(new HttpErreur("Impossible de trouver le stage", 404));
  }

  try {
    await stage.deleteOne();
    if (stage.etudiants.length > 0) {
      stage.etudiants.stages.pull(stage);
      await stage.etudiants.save();
    }
  } catch {
    return next(new HttpErreur("Erreur lors de la suppression du stage", 500));
  }
  reponse.status(200).json({ message: "Stage supprimé" });
};
exports.creerStage = creerStage;
exports.getStageById = getStageById;
exports.supprimerStage = supprimerStage;
exports.getStages = getStages;
