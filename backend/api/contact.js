/**
 * API Route: Contact Form Handler
 * Endpoint: POST /api/contact
 *
 * Reçoit les demandes de contact et envoie un email au propriétaire
 */

// Configuration email (à configurer avec les vraies valeurs)
const CONFIG = {
  ownerEmail: 'reservation@id-taxi.fr',
  ownerPhone: '+33 6 85 73 03 39',
  siteName: 'ID Taxi'
};

/**
 * Validation des données du formulaire
 */
function validateContactData(data) {
  const errors = [];

  if (!data.name || data.name.trim().length < 2) {
    errors.push('Le nom est requis (minimum 2 caractères)');
  }

  if (!data.email || !isValidEmail(data.email)) {
    errors.push('Une adresse email valide est requise');
  }

  if (!data.phone || !isValidPhone(data.phone)) {
    errors.push('Un numéro de téléphone valide est requis');
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.push('Le message est requis (minimum 10 caractères)');
  }

  return errors;
}

/**
 * Validation email
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validation téléphone français
 */
function isValidPhone(phone) {
  // Accepte les formats: 0612345678, 06 12 34 56 78, +33612345678, +33 6 12 34 56 78
  const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

/**
 * Formate le message pour l'email
 */
function formatEmailContent(data) {
  const date = data.date ? new Date(data.date).toLocaleDateString('fr-FR') : 'Non spécifiée';

  return `
Nouvelle demande de contact - ${CONFIG.siteName}
================================================

INFORMATIONS CLIENT
-------------------
Nom: ${data.name}
Email: ${data.email}
Téléphone: ${data.phone}

DÉTAILS DU TRAJET
-----------------
Départ: ${data.departure || 'Non spécifié'}
Destination: ${data.destination || 'Non spécifiée'}
Date souhaitée: ${date}
Nombre de passagers: ${data.passengers || 'Non spécifié'}

MESSAGE
-------
${data.message}

================================================
Envoyé depuis le site ${CONFIG.siteName}
  `.trim();
}

/**
 * Handler principal de l'API
 * Compatible avec Vercel, Netlify, et autres plateformes serverless
 */
export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only accept POST
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Méthode non autorisée'
    });
  }

  try {
    const data = req.body;

    // Validation
    const errors = validateContactData(data);
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        error: errors[0],
        errors: errors
      });
    }

    // Préparer le contenu de l'email
    const emailContent = formatEmailContent(data);

    // ================================================
    // OPTION 1: Utiliser un service d'email (Resend, SendGrid, etc.)
    // Décommenter et configurer selon le service choisi
    // ================================================

    /*
    // Exemple avec Resend
    const { Resend } = require('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: 'contact@id-taxi.fr',
      to: CONFIG.ownerEmail,
      subject: `Nouvelle demande - ${data.name}`,
      text: emailContent,
      reply_to: data.email
    });
    */

    /*
    // Exemple avec SendGrid
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    await sgMail.send({
      to: CONFIG.ownerEmail,
      from: 'contact@id-taxi.fr',
      subject: `Nouvelle demande - ${data.name}`,
      text: emailContent,
      replyTo: data.email
    });
    */

    // ================================================
    // OPTION 2: Log pour le développement
    // À remplacer par un vrai service email en production
    // ================================================
    console.log('=== NOUVELLE DEMANDE DE CONTACT ===');
    console.log(emailContent);
    console.log('===================================');

    // Réponse succès
    return res.status(200).json({
      success: true,
      message: 'Votre demande a bien été envoyée. Nous vous recontacterons dans les plus brefs délais.'
    });

  } catch (error) {
    console.error('Erreur API contact:', error);
    return res.status(500).json({
      success: false,
      error: 'Une erreur est survenue. Veuillez réessayer ou nous contacter par téléphone.'
    });
  }
}
