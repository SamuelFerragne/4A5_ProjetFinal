const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
mongoose.set("strictQuery", true);

const stageRoute = require("./routes/stages-routes");
const etudiantRoute = require("./routes/etudiants-routes");

const HttpErreur = require("./models/http-erreur");

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use("/api/Stage", stageRoute);
app.use("/api/Etudiant", etudiantRoute);

app.use((requete, reponse, next) => {
  return next(new HttpErreur("Route non trouvée", 404));
});

app.use((error, requete, reponse, next) => {
  if (reponse.headerSent) {
    return next(error);
  }
  reponse.status(error.code || 500);
  reponse.json({
    message: error.message || "Une erreur inconnue est survenue",
  });
});

mongoose
  .connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_NAME}.pveblex.mongodb.net/?retryWrites=true&w=majority`)
  .then(() => {
    app.listen(5000);
    console.log("Connexion à la base de données réussie");
  })
  .catch((erreur) => {
    console.log(erreur);
  });
