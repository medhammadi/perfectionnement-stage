const CV = require("../models/cv");
const Technique = require("../models/competanceTechnique");
const Hard = require("../models/hardSkils");
const Longue = require("../models/longue");
exports.creer = async (req, res) => {
  try {
    var cv = new CV({
      cvCondidat: req.file.filename,
      userId: req.body.userId,
    });
    var result = await cv.save();
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.creerViaformuliare = async (req, res) => {
  const {
    longueDescription,
    descriptionhardskils,
    descriptioncomptenceTechnique,
    nom,
    prenom,
    adresse,
    telephone,
  } = req.body;
  try {
    const technique = await Technique.create({
      descriptioncomptenceTechnique,
    });
    const hard = await Hard.create({
      descriptionhardskils,
    });
    const longue = await Longue.create({
      longueDescription,
    });
    await CV.create({
      longueDescription,
      descriptionhardskils,
      descriptioncomptenceTechnique,
      nom,
      prenom,
      adresse,
      telephone,
      comptenceTechniqueId: technique._id,
      hardskilsId: hard._id,
      longueId: longue._id,
    });
    return res.status(201).json({ message: "cv crée" });
  } catch (erreur) {
    return res.status(500).json({ erreur });
  }
};
const fs = require("fs");
const path = require("path");

exports.modifier = async (req, res) => {
  try {
    const cvCondidat = req.params.id;

    // Créez un objet contenant les champs à mettre à jour
    const updatedFields = {};

    // Vérifiez les champs que vous souhaitez mettre à jour dans req.body
    if (req.file && req.file.filename) {
      // Supprimer l'ancien fichier CV s'il existe
      const cv = await CV.findById(cvCondidat);
      if (cv && cv.cvCondidat) {
        const oldCVPath = path.join(__dirname, "../cv", cv.cvCondidat);
        fs.unlinkSync(oldCVPath);
      }
      updatedFields.cvCondidat = req.file.filename;
    }
    if (req.body.userId) {
      updatedFields.userId = req.body.userId;
    }

    // Utilisez findOneAndUpdate pour mettre à jour le CV
    const updatedCV = await CV.findByIdAndUpdate(cvCondidat, updatedFields, {
      new: true, // Renvoie le document mis à jour
      runValidators: true, // Exécutez les validateurs de schéma lors de la mise à jour
    });

    if (!updatedCV) {
      return res.status(404).send("CV non trouvé.");
    }

    res.send(updatedCV);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur lors de la mise à jour du CV.");
  }
};

exports.getCVByIdUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Recherchez le CV correspondant à l'ID de l'utilisateur
    const cv = await CV.findOne({ userId });

    // Si aucun CV n'est trouvé pour cet utilisateur, retourner 0
    if (!cv) {
      return res.send({ cvNom: null, countCV: 0 });
    }

    // Vérifier si l'utilisateur a soumis son CV
    if (!cv.cvCondidat) {
      // Si aucun CV n'a été soumis, retourner 0
      return res.send({ cvNom: null, countCV: 0 });
    }

    // Compter le nombre de candidats ayant postulé avec un CV
    const countCV = await CV.countDocuments({
      cvCondidat: { $exists: true, $ne: null },
    });

    // Envoyer le nom du CV et le compteur en réponse
    res.send({ cvNom: cv.cvCondidat, countCV });
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur lors de la récupération du CV.");
  }
};
