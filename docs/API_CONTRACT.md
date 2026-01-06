# Contrat API - Collaboration Backend (Claude) ↔ Frontend (Gemini)

> Ce document définit l'interface entre le backend et le frontend.
> Gemini doit utiliser ces endpoints et structures de données pour le frontend.

---

## Architecture Globale

```
┌─────────────────┐         ┌─────────────────┐
│                 │   API   │                 │
│    FRONTEND     │ ◄─────► │    BACKEND      │
│    (Gemini)     │  JSON   │    (Claude)     │
│                 │         │                 │
│  - HTML/CSS     │         │  - API Routes   │
│  - JavaScript   │         │  - SEO Data     │
│  - Formulaires  │         │  - Validation   │
│                 │         │  - Email        │
└─────────────────┘         └─────────────────┘
```

---

## Endpoints API

### 1. Formulaire de Contact

**Endpoint** : `POST /api/contact`

**Request Body** :
```json
{
  "name": "string (required)",
  "email": "string (required, valid email)",
  "phone": "string (required)",
  "departure": "string (optional)",
  "destination": "string (optional)",
  "date": "string (optional, ISO 8601)",
  "passengers": "number (optional, 1-8)",
  "message": "string (required)"
}
```

**Response Success (200)** :
```json
{
  "success": true,
  "message": "Votre demande a bien été envoyée. Nous vous recontacterons rapidement."
}
```

**Response Error (400)** :
```json
{
  "success": false,
  "error": "Veuillez remplir tous les champs obligatoires."
}
```

---

### 2. Données des Villes (SEO)

**Endpoint** : `GET /api/cities`

**Response** :
```json
{
  "cities": [
    {
      "slug": "saint-gratien",
      "name": "Saint-Gratien",
      "postalCode": "95210",
      "department": "Val-d'Oise",
      "isMain": true,
      "metaTitle": "Taxi Saint-Gratien | Réservation 24h/24 - ID Taxi",
      "metaDescription": "Service de taxi à Saint-Gratien (95). Transferts aéroports, gares. Disponible 24h/24. Appelez le 06 85 73 03 39."
    },
    {
      "slug": "enghien-les-bains",
      "name": "Enghien-les-Bains",
      "postalCode": "95880",
      "department": "Val-d'Oise",
      "isMain": false,
      "metaTitle": "Taxi Enghien-les-Bains | Transfert Aéroport - ID Taxi",
      "metaDescription": "Taxi à Enghien-les-Bains. Tous trajets et transferts aéroports. Service 24h/24, 7j/7. Réservez au 06 85 73 03 39."
    }
  ]
}
```

---

### 3. Données des Services

**Endpoint** : `GET /api/services`

**Response** :
```json
{
  "services": [
    {
      "id": "airport-transfer",
      "slug": "transfert-aeroport",
      "title": "Transfert Aéroport",
      "icon": "plane",
      "description": "Navettes vers Roissy CDG, Orly et Beauvais",
      "features": [
        "Suivi des vols en temps réel",
        "Prix fixe annoncé à l'avance",
        "Prise en charge à l'heure"
      ]
    },
    {
      "id": "train-station",
      "slug": "transfert-gare",
      "title": "Transfert Gare",
      "icon": "train",
      "description": "Navettes vers toutes les gares parisiennes",
      "features": [
        "Gare du Nord, Gare de Lyon, Montparnasse...",
        "Ponctualité garantie",
        "Aide aux bagages"
      ]
    },
    {
      "id": "custom",
      "slug": "trajet-personnalise",
      "title": "Trajet Personnalisé",
      "icon": "car",
      "description": "Tous vos déplacements sur mesure",
      "features": [
        "Rendez-vous médicaux",
        "Événements",
        "Longue distance"
      ]
    }
  ]
}
```

---

### 4. Informations de l'Entreprise

**Endpoint** : `GET /api/company`

**Response** :
```json
{
  "name": "ID Taxi",
  "tagline": "Une autre idée du transport en taxi",
  "phone": "+33 6 85 73 03 39",
  "phoneFormatted": "06 85 73 03 39",
  "email": "reservation@id-taxi.fr",
  "address": {
    "city": "Saint-Gratien",
    "postalCode": "95210",
    "department": "Val-d'Oise",
    "country": "France"
  },
  "hours": "24h/24 - 7j/7",
  "languages": ["Français", "Anglais", "Espagnol"],
  "social": {
    "facebook": null,
    "instagram": null
  }
}
```

---

### 5. Témoignages Clients

**Endpoint** : `GET /api/testimonials`

**Response** :
```json
{
  "testimonials": [
    {
      "id": 1,
      "name": "Marie D.",
      "city": "Enghien-les-Bains",
      "rating": 5,
      "text": "Service impeccable, chauffeur ponctuel et très professionnel. Je recommande !",
      "date": "2024-12-15"
    },
    {
      "id": 2,
      "name": "Pierre L.",
      "city": "Saint-Gratien",
      "rating": 5,
      "text": "Transfert aéroport parfait. Prix fixe et véhicule confortable.",
      "date": "2024-11-20"
    }
  ]
}
```

---

## Structure des Pages Frontend

### Pages Requises

| Page | Route | Template | Données API |
|------|-------|----------|-------------|
| Accueil | `/` | `home` | company, services, testimonials |
| Taxi [Ville] | `/taxi-[slug]/` | `city` | cities (filtered), company |
| Services | `/services/` | `services` | services, company |
| Transfert Aéroport | `/transfert-aeroport/` | `service-detail` | services (filtered) |
| Contact | `/contact/` | `contact` | company |
| Mentions Légales | `/mentions-legales/` | `legal` | company |

---

## Composants Frontend Requis

### Header
- Logo ID Taxi
- Navigation (Accueil, Services, Villes, Contact)
- Bouton CTA : "Appelez-nous" avec numéro

### Hero Section
- Titre accrocheur avec mot-clé principal
- Sous-titre avec proposition de valeur
- Bouton CTA : Téléphone
- Image de fond (taxi professionnel)

### Section Services
- 3 cartes (Aéroport, Gare, Personnalisé)
- Icônes distinctives
- CTA vers formulaire

### Formulaire de Contact
- Champs : Nom, Email, Téléphone, Départ, Arrivée, Date, Message
- Validation côté client
- Envoi vers `POST /api/contact`

### Footer
- Coordonnées
- Navigation secondaire
- Villes desservies (liens SEO)
- Mentions légales

---

## Consignes pour Gemini (Frontend)

1. **Mobile First** : Le site doit être parfaitement responsive
2. **Performance** : Optimiser les images, lazy loading
3. **SEO** : Utiliser les balises meta fournies par l'API
4. **Accessibilité** : ARIA labels, contraste suffisant
5. **CTA visibles** : Le numéro de téléphone doit être très visible
6. **Couleurs suggérées** :
   - Primaire : Bleu foncé (#1a365d)
   - Accent : Jaune taxi (#f6c744)
   - Texte : Gris foncé (#2d3748)

---

## Statut de Développement

| Composant | Backend (Claude) | Frontend (Gemini) |
|-----------|------------------|-------------------|
| API Contact | 🔲 À faire | - |
| API Cities | 🔲 À faire | - |
| API Services | 🔲 À faire | - |
| Page Accueil | - | 🔲 À faire |
| Pages Villes | - | 🔲 À faire |
| Formulaire | - | 🔲 À faire |
