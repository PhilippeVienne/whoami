# Philippe Vienne — Portfolio & CV Professionnel (ATS Compatible)

Site de présentation et CV professionnel pour **Philippe Vienne** — Architecte Cloud & DevOps, ancien Directeur Technique (CTO) de startup, 15 ans d'expérience.

- 🌐 **Site Web en production** : [https://philippe.vienne.me](https://philippe.vienne.me)
- 📄 **Source de vérité unique** : [`content/cv.fr.md`](./content/cv.fr.md) & [`content/cv.en.md`](./content/cv.en.md)
- 🖨️ **Version PDF ATS** : Générée automatiquement lors du build en 2 pages optimisées (FR & EN).

---

## 🏛️ Philosophie & Architecture

1. **Markdown comme source de vérité unique :**
   - Toutes les données professionnelles (expériences, missions EDF/Skyloud/Smartfire, certifications AWS/GCP/Terraform, chiffres clés) sont rédigées dans `content/cv.fr.md` et `content/cv.en.md`.
   - Les fichiers bruts sont directement téléchargeables ou exploitables par des LLM (ChatGPT, Claude, Gemini) via un bouton dédié sur le site.

2. **Design « Bleu Europe & Confiance » :**
   - Palette institutionnelle inspirée du bleu Reflex Blue européen (`#003399`) et touches d'or (`#FFCC00`), transmettant autorité, rigueur d'ingénierie et fiabilité pour les secteurs régulés (Nucléaire EDF, Secteur Aérien Air France, Cloud Souverain S3NS, FinTech bancaire à Singapour).
   - Mode clair et mode sombre intégrés avec détection automatique des préférences système et persistance `localStorage`.
   - Filtres interactifs par secteur d'activité (Cloud, CTO, Secteurs réglementés).

3. **Génération PDF ATS ultra-rigoureuse :**
   - Rendu en exactement **2 pages calibrées** (standard international pour profils seniors).
   - Hiérarchie sémantique pure (`H1`, `H2`, listes à puces simples), polices standard sans empattement, flux de texte continu, 100% extractible par les moteurs ATS (Workday, Taleo, Greenhouse, Lever, etc.).
   - Génération automatisée en local et en CI GitHub Actions via Google Chrome Headless (`--print-to-pdf`).

4. **Déploiement GitHub Pages & Domaine Personnalisé :**
   - Fichier `CNAME` (`philippe.vienne.me`) et `.nojekyll` créés automatiquement dans `dist/`.
   - Workflow GitHub Actions prêt pour déploiement direct à chaque commit sur `main`.

---

## 🚀 Commandes & Développement

### Installation des dépendances
```bash
npm install
```

### Lancement du serveur de développement local (avec rechargement automatique)
```bash
npm run dev
# ou
npm start
```
Accès local :
- Version Française : `http://localhost:3000/`
- Version Anglaise : `http://localhost:3000/en/`
- Aperçu ATS Français : `http://localhost:3000/ats-fr.html`
- Aperçu ATS Anglais : `http://localhost:3000/ats-en.html`

### Build statique complet et génération des PDFs
```bash
npm run build
```
Cette commande :
1. Compile le Markdown vers `dist/index.html` (FR) et `dist/en/index.html` (EN).
2. Génère `dist/ats-fr.html` et `dist/ats-en.html`.
3. Lance Google Chrome Headless pour produire `dist/Philippe_Vienne_CV_FR.pdf` et `dist/Philippe_Vienne_CV_EN.pdf`.
4. Copie les fichiers sources Markdown bruts (`dist/cv.fr.md`, `dist/cv.en.md`) et les assets dans `dist/`.

---

## 📂 Structure du Répertoire

```text
whoami/
├── content/
│   ├── cv.fr.md          # Source de vérité en français (frontmatter YAML + texte)
│   └── cv.en.md          # Source de vérité en anglais
├── public/
│   ├── avatar.png        # Photo de profil de Philippe Vienne
│   └── favicon.svg       # Favicon personnalisé Bleu Europe / Or
├── scripts/
│   ├── build.mjs         # Compilateur Markdown vers HTML
│   ├── generate-pdf.mjs  # Générateur PDF vectoriel ATS via Chrome headless
│   └── dev-server.mjs    # Serveur de dev avec live watch
├── src/
│   ├── css/
│   │   ├── style.css     # Design System Web (Bleu Europe, Dark/Light)
│   │   └── ats.css       # Stylesheet ATS strict calibré 2 pages
│   ├── js/
│   │   └── app.js        # Filtres, toggle thème, modal Markdown, toast
│   └── templates/
│       ├── web.html.mjs  # Template HTML du portfolio interactif
│       └── ats.html.mjs  # Template HTML de la version ATS
├── .github/
│   └── workflows/
│       └── deploy.yml    # Workflow CI/CD GitHub Pages
├── LICENSE.md            # Conditions de licence (AGPLv3 & CC BY-SA 4.0)
├── package.json
└── README.md
```

---

## 📝 Mise à jour de votre CV

Pour mettre à jour une expérience, ajouter une certification ou modifier vos coordonnées :
1. Modifiez simplement `content/cv.fr.md` (et `content/cv.en.md`).
2. Exécutez `npm run build` (ou poussez sur `main` si GitHub Actions est actif).
3. Le site web, les fichiers Markdown bruts et les versions PDF ATS sont automatiquement recalculés !

---

## 📄 Licences & Droits

Ce projet applique un modèle de licence dual précisé dans [`LICENSE.md`](./LICENSE.md) :

- **Moteur & Générateur de code** : [GNU AGPLv3](https://www.gnu.org/licenses/agpl-3.0.html) (`scripts/`, `src/`, templates, CSS, JS).
- **Contenu & Données du CV** : [Creative Commons BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/legalcode.fr) (`content/cv.fr.md`, `content/cv.en.md`).
- **Exceptions et réserves expresses** :
  - **Photo de profil** (`avatar.png`) : Reste sous **droit entièrement privé** (propriété exclusive de Philippe Vienne, tous droits réservés).
  - **Logos & Marques tiers** : Demeurent la **propriété respective de leurs titulaires légaux** (utilisés uniquement à des fins d'identification factuelle du parcours professionnel).
