# beCode_meteo
# App Météo

Ce projet est une application météo qui permet de rechercher des villes et d'afficher les prévisions météorologiques. L'application utilise plusieurs API pour obtenir les données météorologiques et géographiques.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les éléments suivants sur votre machine :

- [Node.js](https://nodejs.org/) (version 14 ou supérieure)
- [npm](https://www.npmjs.com/) (version 6 ou supérieure)

## Installation

1. Clonez le dépôt :

```bash
git clone https://github.com/junior344/beCode_meteo.git
```
   

## Accédez au répertoire du projet :
- cd app_meteo
## Installez les dépendances :
```bash
npm install
```


# Scripts
Voici les scripts disponibles dans ce projet :

- dev : Lance le serveur de développement avec Vite.
- build : Compile le projet TypeScript et construit le projet avec Vite.
- preview : Prévisualise le projet construit avec Vite.
Vous pouvez exécuter ces scripts avec la commande npm run <script>.

# Dépendances
Voici la liste des dépendances utilisées dans ce projet :

- @maptiler/sdk : SDK pour intégrer les cartes MapTiler.
- @types/google.maps : Types pour l'API Google Maps.
- chart.js : Librairie pour créer des graphiques.

## Voici la liste des dépendances de développement utilisées dans ce projet :

- typescript : Superset de JavaScript qui ajoute des types statiques.
- vite : Outil de build rapide pour les projets web modernes.

# Utilisation
Lancez le serveur de développement :

```bash 
npm run dev
```

Ouvrez votre navigateur et accédez à l'URL affichée dans la console (généralement http://localhost:3000).

Utilisez la barre de recherche pour entrer le nom d'une ville et obtenir les prévisions météorologiques.

# Structure du projet
Voici un aperçu de la structure des fichiers du projet :
```bash
app_meteo/
├── node_modules/
├── public/
├── src/
│   ├── main.ts
│   ├── suggestionName.ts
│   ├── style.css
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
``` 

- src/main.ts : Point d'entrée principal de l'application.
- src/suggestionName.ts : Contient les fonctions pour récupérer les suggestions - de villes et les données météorologiques.
- src/style.css : Fichier de styles CSS.
- index.html : Fichier HTML principal.
- package.json : Fichier de configuration npm.
- tsconfig.json : Fichier de configuration TypeScript.
- vite.config.ts : Fichier de configuration Vite.

# API utilisées
- OpenWeatherMap API : Pour obtenir les données météorologiques.
- Geoapify API : Pour obtenir les suggestions de villes.
- MapTiler API : Pour intégrer les cartes.
# Auteurs
[Mbogle josias](https://www.linkedin.com/in/josias-mbogle/)
