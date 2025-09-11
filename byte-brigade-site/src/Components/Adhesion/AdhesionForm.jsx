import React, { useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import emailjs from '@emailjs/browser'; 
import { db } from "../Firebase/Firebase";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from "../Firebase/Firebase"; 

export default function AdhesionForm() {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    tel: '',
    email: '',
    motivation: '',
    sexe: '',
    niveau: '',
    passionne: '',
    competences: [],
    autreCompetence: '',
    commentaires: ''
  });

  const competencesOptions = ["Design", "Gestion de projet", "Travail en équipe", "Informatique","Autres"];

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      const newCompetences = checked
        ? [...formData.competences, value]
        : formData.competences.filter(c => c !== value);
      setFormData({ ...formData, competences: newCompetences });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!emailRegex.test(formData.email)) {
      toast.error("Veuillez saisir un email valide.");
      return;
    }

    try {
      // Enregistrement dans Firestore
      await addDoc(collection(db, "demandesAdhesion"), {
        ...formData,
        competences: formData.autreCompetence 
          ? [...formData.competences.filter(c => c !== "Autres"), formData.autreCompetence]
          : formData.competences,
        timestamp: Timestamp.now()
      });


      const competencesFinales = formData.autreCompetence
        ? [...formData.competences.filter(c => c !== "Autres"), formData.autreCompetence]
        : formData.competences;

      // Envoi email au candidat
      await emailjs.send(
        'gmailService',
        'template_xmxlhkb',
        {
          to_name: formData.prenom,
          from_name: "Byte Brigade",
          to_email: formData.email,
          message: `Bonjour ${formData.prenom},\n\nMerci pour ta candidature au club informatique Byte Brigade. Ton message a bien été reçu.\n\nNous reviendrons vers toi prochainement.\n\nCordialement,\nL’équipe Byte Brigade.`,
        },
        '5ClTGt_8TWjsxfOAJ'
      );

      // Envoi email au club/admin
      await emailjs.send(
        'gmailService',
        'template_9ayzxha',
        {
          to_name: "Admin Byte Brigade",
          from_name: `${formData.prenom} ${formData.nom}`,
          to_email: "bytebrigadeclub@gmail.com",
          message: `
                    Nouvelle demande d’adhésion reçue :

                    Nom : ${formData.nom}
                    Prénom : ${formData.prenom}
                    Email : ${formData.email}
                    Téléphone : ${formData.tel}
                    Motivation : ${formData.motivation}
                    Sexe : ${formData.sexe}
                    Niveau : ${formData.niveau}
                    Passionné : ${formData.passionne}
                    Compétences : ${competencesFinales.join(", ")}
                    Commentaires : ${formData.commentaires}
          `,
        },
        '5ClTGt_8TWjsxfOAJ'
      );

      toast.success("Demande enregistrée et email envoyé !");
      setFormData({
        nom: '',
        prenom: '',
        tel: '',
        email: '',
        motivation: '',
        sexe: '',
        niveau: '',
        passionne: '',
        competences: [],
        autreCompetence: '', 
        commentaires: ''
      });

    } catch (error) {
      console.error("Erreur lors de l’enregistrement ou de l’envoi d’email :", error);
      toast.error("Erreur lors de l'envoi. Veuillez réessayer.");
    }
  };

  return (
    <div id="formulaire-adhesion" className="container py-5">
      <h2 className="text-center mb-4">Formulaire d'adhésion</h2>
      <form onSubmit={handleSubmit} className="mt-4">

        <div className="row mb-3">
          <div className="col-md-6">
            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              placeholder="Nom"
              className="form-control"
              required
            />
          </div>

          <div className="col-md-6">
            <input
              type="text"
              name="prenom"
              value={formData.prenom}
              onChange={handleChange}
              placeholder="Prénom"
              className="form-control"
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <input
            type="tel"
            name="tel"
            value={formData.tel}
            onChange={handleChange}
            placeholder="Numéro de téléphone"
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <textarea
            name="motivation"
            value={formData.motivation}
            onChange={handleChange}
            placeholder="Pourquoi souhaitez-vous rejoindre le club ?"
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          Sexe :
          <div><label><input type="radio" name="sexe" value="Femme" onChange={handleChange} required /> Femme</label></div>
          <div><label><input type="radio" name="sexe" value="Homme" onChange={handleChange} /> Homme</label></div>
        </div>

        <div className="mb-3">
          <input
            type="text"
            name="niveau"
            value={formData.niveau}
            onChange={handleChange}
            placeholder="Niveau scolaire"
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <textarea
            name="passionne"
            value={formData.passionne}
            onChange={handleChange}
            className="form-control"
            placeholder="Que connaissez-vous en informatique ?"
            required
          />
        </div>

        <div className="mb-3">
          Compétences :
          {competencesOptions.map((comp, idx) => (
            <div key={idx}>
              <label>
                <input
                  type="checkbox"
                  name="competences"
                  value={comp}
                  checked={formData.competences.includes(comp)}
                  onChange={handleChange}
                />
                {" "}{comp}
              </label>

              {comp === "Autres" && formData.competences.includes("Autres") && (
                <input
                  type="text"
                  name="autreCompetence"
                  value={formData.autreCompetence}
                  onChange={handleChange}
                  placeholder="Précisez vos compétences"
                  className="form-control mt-2"
                />
              )}
            </div>
          ))}
        </div>

        <div className="mb-3">
          <textarea
            name="commentaires"
            value={formData.commentaires}
            onChange={handleChange}
            placeholder="Questions ou commentaires ?"
            className="form-control"
          />
        </div>

        <button type="submit" className="btn btn-primary ">Envoyer</button>
      </form>

      <ToastContainer position="top-right" autoClose={4000} hideProgressBar />
    </div>
  );
}
