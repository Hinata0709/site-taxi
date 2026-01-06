# ID Taxi - Site Web

> Projet de site web pour ID Taxi, service de taxi à Saint-Gratien (Val-d'Oise)

## Structure du Projet

```
id-taxi-website/
├── backend/
│   ├── api/
│   │   └── contact.js         # API formulaire de contact
│   └── data/
│       ├── cities.json        # Données SEO des villes
│       ├── services.json      # Données des services
│       ├── company.json       # Infos entreprise
│       └── schema.json        # Données structurées SEO
├── frontend/                   # → Gemini (à développer)
├── docs/
│   ├── PROJECT_INFO.md        # Infos projet
│   ├── SEO_KEYWORDS.md        # Stratégie SEO
│   └── API_CONTRACT.md        # Contrat API Claude ↔ Gemini
└── assets/                     # Images, logos
```

## Collaboration

| Rôle | Responsable | Tâches |
|------|-------------|--------|
| **Backend** | Claude | API, données, SEO technique |
| **Frontend** | Gemini | HTML/CSS, design, intégration |

## Informations Clés

- **Entreprise** : ID Taxi
- **Localisation** : Saint-Gratien (95210)
- **Téléphone** : 06 85 73 03 39
- **Email** : reservation@id-taxi.fr
- **Horaires** : 24h/24 - 7j/7

## Déploiement Prévu

- **Hébergement** : Vercel ou Netlify (gratuit)
- **Domaine** : À définir (~12€/an)

## Commandes

```bash
# Installation (à venir)
npm install

# Développement
npm run dev

# Build production
npm run build
```

## Statut

- [x] Phase 1 : Audit SEO et mots-clés
- [x] Phase 2 : Architecture backend
- [x] Phase 3 : Données structurées SEO
- [ ] Phase 4 : Développement frontend (Gemini)
- [ ] Phase 5 : Intégration et déploiement
