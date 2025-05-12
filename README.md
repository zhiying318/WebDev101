# WebDev101 - Site Démonstration

Ce site est une démonstration réalisée dans le cadre du cours **WebDev101** de Télécom Paris (année 2025), par **Zhiying Zou**.

## 🌐 Présentation

Le site WebDev101 présente une interface simple et ludique pour organiser les différentes activités du cours :

- **Accueil (Home)** : Une page d'introduction.
- **Exercices WebDev101** : Accès aux exercices pratiques du cours. (01-18). Parmi les pluparts, après cliquer sur le button 'Run', vous verrez le résultat directement dessous le button.
- **Mini Projet - PUNTO** : Accès au mini-projet réalisé pendant le cours. Vous pouvez l'essayer.
- **Projet final** : Lien vers le projet final développé pour conclure le cours. Le vidéo de démonstration est publié sur Youtube et vous trouverez un lien vers le vidéo dans cette page.

L’ensemble du site est construit avec [Astro](https://astro.build), un framework moderne pour les sites rapides et simples. Le code sont mis sur le [github](https://github.com/zhiying318/WebDev101) de Zhiying

---

## 🚀 Accès en ligne (Recommended🤗)

Ce site est déjà **déployé en ligne** grâce à GitHub Pages. Vous pouvez y accéder directement via le lien suivant :

🔗 **[Visiter le site WebDev101 du Zhiying Zou](https://zhiying318.github.io/WebDev101/)**

*Aucune installation locale n’est nécessaire.*


---

## 🛠️ Déploiement local (Optionnel)

### Étapes d'installation :

1. **Cloner le dépôt :**

   ```bash
   git clone https://github.com/zhiying318/WebDev101.git
   cd WebDev101
   ```
   
2. **Build et Run localement :**
   
   ```bash
   bun install
   bun run dev
   ```
Allez à [localhost](http://localhost:4321) pour tester le site.

---

## 📁 Structure du projet 

  ```
  WEBDEV101/
├── .astro/                         # Cache de compilation généré par Astro
├── .github/                        # Actions GitHub, CI/CD
├── dist/                           # Fichiers générés après build
├── json-api/                       # API JSON locale (ex: pour json-server)
├── node_modules/                   # Dépendances installées
├── public/                         # Dossier public (statique, accessible directement)
│   ├── exercices/                  # Scripts publics pour les exercices (js/ts)
│   │   ├── 02_hello_astro_typescript/
│   │   │   ├── app.ts
│   │   │   ├── app.js
│   │   ├── 03_modules/
│   │   ├── 06_CSS_flexbox/
│   │   └── ... jusqu’à 18_web_components/
│   ├── images/exercices/           # Captures d’écran utilisées dans les exercices
│   │   ├── 04_a.png
│   │   └── 04_b.png
│   ├── scripts/                    # Scripts réutilisables côté client/serveur
│   │   ├── api.js
│   │   ├── api.ts
│   │   ├── punto_app.js
│   │   └── punto_app.ts
│   ├── favicon.svg                 # Icône du site
│   └── image.jpeg                  # Image statique
├── src/
│   ├── assets/                     # (optionnel) Images ou ressources locales
│   ├── components/
│   │   ├── exercices/              # Tous les fichiers .astro pour chaque exercice
│   │   │   ├── 01_hello_world_ts.astro
│   │   │   ├── 02_hello_astro_typescript.astro
│   │   │   └── ... jusqu’à 18_web_components.astro
│   │   ├── navbar.astro
│   │   └── Welcome.astro
│   ├── layouts/
│   │   └── Layout.astro            # Composant de mise en page global
│   ├── pages/                      # Pages du site accessibles par URL
│   │   ├── exercices.astro
│   │   ├── index.astro
│   │   ├── miniprojet.astro
│   │   └── projetfinal.astro
│   └── styles/                     # Fichiers CSS organisés par section
│       ├── exercices.css
│       ├── global.css
│       ├── navbar.css
│       └── projetfinal.css
├── .gitignore                      # Fichiers à ignorer par Git
├── .nojekyll                       # Empêche GitHub Pages d’utiliser Jekyll
├── astro.config.mjs               # Configuration Astro (routes, intégrations)
├── bun.lock                        # Fichier lock de Bun
├── db.json                         # Base de données mockée pour json-server
├── package.json                    # Dépendances npm et scripts
├── server.js                       # Serveur local pour json-server ou autres tests
├── tsconfig.exos.json              # TS config pour les exercices
├── tsconfig.json                   # Configuration TypeScript générale
└── tsconfig.public.json            # TS config spécifique au dossier `public/`
```
