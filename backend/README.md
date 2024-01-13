# API SSVE

Serveur (Typescript, Express, Node.js) pour le projet de systeme de suggestion de véhicule électrique

# Table of contents:

- [API SSVE](#api-ssve)
- [Table of contents:](#table-of-contents)
- [Auteurs](#auteurs)
- [Installation and Usage](#installation-and-usage)
- [Structure du projet](#structure-du-projet)
  - [Configuration de compilation](#configuration-de-compilation)
  - [Dependences](#dependences)
    - [`dependencies`](#dependencies)
    - [`devDependencies`](#devdependencies)

# Auteurs

Les étudiants(es) du projet pilote INM5151 hiver 2023 de l'Université du Québec a Montréal.

# Installation and Usage

Pour installer et exécuter le serveur localement :

Naviguez vers le répertoire du projet dans le terminal `cd backend`

Installer les dépendances requises `npm install`

Pour lancer l'application en mode développement `npm run backend`

Pour lancer l'application en mode production `npm run start`

Pour tester les endpoints de l'API, vous pouvez utiliser un tel que `Postman`

# Structure du projet

Les fichier TypeScript (`.ts`) ce trouve dans le dossier `src`. Aprés la compilation les fichier (`.js`) ce retrouveront dans le repertoire `dist`.

La structure complète des dossiers de cette application est expliquée ci-dessous :

> **Note!** Afin de lancer l'application comme en production, n'oubier pas de `npm run build` afin que le repertoire `dist` soit générée.

| Name                           | Description                                                                                                                                                                                                                                                      |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- |
| **dist**                       | Contient le code distribuable (ou sortie) de la compilation TypeScript. Il s'agit du code que vous aller envoyer sur le serveur.                                                                                                                                 |
| **node_modules**               | Contient toutes les dépendances npm                                                                                                                                                                                                                              |
| **src**                        | Contient le code source qui sera compilé dans le répertoire de distribution.                                                                                                                                                                                     |
| **src/config**                 | Contient la configuration des constantes environnements présente dans les ficher .env.production et .env.development                                                                                                                                             |
| **src/controllers**            | Les contrôleurs définissent les fonctions qui répondent aux diverses requetes http recu par le serveur                                                                                                                                                           |
| **src/exceptions**             | Contient les differentes classes d'exceptions utilisée dans l'application                                                                                                                                                                                        |
| **src/interfaces**             | Contient la définition des interfaces : structures standard de données                                                                                                                                                                                           |
| **src/logs**                   | Répertoire généré automatiquement qui va contenir les fichier de journalisation quotidiens                                                                                                                                                                       |
| **src/logs/debug**             | Répertoire généré automatiquement qui va contenir les logs de niveau debug (les appels a logger.debug("mon message") dans le code. )                                                                                                                             |
| **src/logs/error**             | Répertoire généré automatiquement qui va contenir les logs de niveau error (les appels a logger.error("mon message d'erreur") dans le code. )                                                                                                                    |
| **src/middlewares**            | Joue un rôle primordial dans le cycle de vie des requetes-réponse de l'application                                                                                                                                                                               |
| **src/middlewares/error**      | Class qui va s'occuper de journaliser (logger) et renvoyer une réponse http lorsqu'une exception http c'est levée.                                                                                                                                               |
| **src/middlewares/validation** | Class qui va ce charger de verifier que l'object dans le body d'une requete http respecte le format et les annotations de son object de destination                                                                                                              |
| **src/routes**                 | Définie les routes de l'API et lie chaque route a son controller. Fait en sorte que chaque route a ca propre classe.                                                                                                                                             |
| **src/utils**                  | Contient des classes possiblement utile au autres repertoire du projet                                                                                                                                                                                           |
| **src/utils/envValidation**    | Classe ayant pour fonction de reinitilier les variables d'environnement (process.env) a chaque execution de l'application                                                                                                                                        |
| **src/utils/logger**           | Cette classe definie et parametre le systeme de journalisation de l'application (logger). Les logs seront visible a la console au moment de l'execution + seront sauvegardée dans les répertoires /logs/debug et /logs/debug selon le format `date-courante.log` |
| **src/utils/util**             | Cette classe contient des méthodes a usage géneral                                                                                                                                                                                                               |     |
| **test**                       | Contient les tests. Ils sont séparé de src pour ne pas les inclure dans le repertoire `dist` apres compilation                                                                                                                                                   |
| **.env.development**           | Constante liée au dévelopement (ex : URL vers une copie de la BD en local, Port, repertoire de logs, ect)                                                                                                                                                        |
| **Dockerfile**                 | L'image docker de l'api.                                                                                                                                                                                                                                         |
| **.dockerignore**              | Les patterns de fichiers exclus lors du build de l'image (plus utile pour les personnes qui travaillent sur le déploiement).                                                                                                                                     |
| **nodemon.json**               | Configuration de nodemon. Un outil de développent qui surveillera tout changement dans le code source et redémarrera le serveur automatiquement.                                                                                                                 |
| **swagger.yaml**               | Contient la documentation swagger de l'API. Cette documentation est accesible via vote browser sur http://localhost:{port}/api-docs. A noter qu'il faut la mettre a jour lorsqu'on implemente de nouvelles route.                                                |
| **tsconfig.json**              | Fichier de configuration du compilateur qui inclue les tests (permet d'éviter des fausses erreur dans le repertoire /test. )                                                                                                                                     |
| **tsconfig.prod.json**         | Fichier de configuration du compilateur qui exclue les tests.                                                                                                                                                                                                    |
| **.gitignore**                 | Extension de fichier qui vont etre exclue des add/commit git                                                                                                                                                                                                     |

## Configuration de compilation

TypeScript utilise le fichier `tsconfig.json` pour ajuster les options de compilation

```json
"compilerOptions": {
     "target": "es2017",
    "lib": ["es2017", "esnext.asynciterable"],
    "typeRoots": ["node_modules/@types"],
    "allowSyntheticDefaultImports": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "forceConsistentCasingInFileNames": true,
     "moduleResolution": "node",
     "module": "commonjs",
    "pretty": true,
     "sourceMap": true,
    "declaration": true,
     "outDir": "dist",
    "allowJs": true,
    "noEmit": false,
     "esModuleInterop": true,
    "resolveJsonModule": true,
    "importHelpers": true,
    "baseUrl": "src",
    "paths": {
      "@/*": ["*"],
      "@config": ["config"],
      "@controllers/*": ["controllers/*"],
      "@dtos/*": ["dtos/*"],
      "@exceptions/*": ["exceptions/*"],
      "@interfaces/*": ["interfaces/*"],
      "@middlewares/*": ["middlewares/*"],
      "@models/*": ["models/*"],
      "@routes/*": ["routes/*"],
      "@services/*": ["services/*"],
      "@utils/*": ["utils/*"]
    }
  }
```

| `compilerOptions`            | Description                                                                                                                                                                                                                                                                                                                                                                                                               |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `"module": "commonjs"`       | Le type de **output** des module (dans les fichiers `.js`). Node utilise commonjs                                                                                                                                                                                                                                                                                                                                         |
| `"esModuleInterop": true,`   | Permet l'utilisation d'une autre syntaxe d'importation de module : `import foo from 'foo'`                                                                                                                                                                                                                                                                                                                                |
| `"target": "es2017"`         | Le niveau de langage de sortie. Node supporte es2017, donc nous pouvons le cibler                                                                                                                                                                                                                                                                                                                                         |
| `"noImplicitAny": true`      | Active un paramètre plus strict qui jette des erreurs lorsque quelque chose a une valeur par défaut `any`                                                                                                                                                                                                                                                                                                                 |
| `"moduleResolution": "node"` | TypeScript tente d'imiter la stratégie de résolution des modules de Node.                                                                                                                                                                                                                                                                                                                                                 |
| `"sourceMap": true`          | source map vous permettent de déposer des points d'arrêt dans votre code source TypeScript et de faire en sorte que ce point d'arrêt soit atteint par le JavaScript qui est exécuté au moment de l'exécution. Chaque fichier .js produit par le compilateur TypeScript sera accompagné d'un fichier .map.js. Ce fichier .map.js fournit les informations nécessaires pour revenir au fichier .ts source lors du débogage. |
| `"outDir": "dist"`           | Emplacement de sortie des fichiers `.js` après la compilation                                                                                                                                                                                                                                                                                                                                                             |
| `"baseUrl": "src"`           | Cela indique au compilateur TypeScript qu'en plus de chercher dans node_modules/@types pour chaque importation de classe, il doit également chercher dans notre propre emplacement de fichier .d.ts <baseUrl> (ici src).                                                                                                                                                                                                  |
| `paths: {...}`               | Avec cette définition, on peux importer les classes de nottre répertoires `src` comme dans l'example suivant : `import IndexRoute from '@/routes/index.route';`. Le but est de ne pas ce soucier de l'emplacement du ficher.                                                                                                                                                                                              |

## Dependences

Les dépendances sont gérées par le fichier `package.json`.
Dans ce fichier, vous trouverez deux sections :

### `dependencies`

| Package                   | Description                                                                     |
| ------------------------- | ------------------------------------------------------------------------------- |
| express                   | Node.js web framework.                                                          |
| express-mysql-session     | Un store de session pour Express qui les stocke dans une base de données MySQL. |
| body-parser               | Express 4 middleware.                                                           |
| cors                      | Express 4 middleware.                                                           |
| compression               | Express 4 middleware.                                                           |
| dotenv                    | Charge les variables d'environnement à partir des fichier .env                  |
| envalid                   | valider et accéder aux variables d'environnement dans Node.js                   |
| class-transformer         | Transformer un objet (ex: json) en une instance de classe et vice versa         |
| class-validator           | Effectuer des validations                                                       |
| mysql                     | Permet d'accéder à une base de données MySQL.                                   |
| typedi & reflect-metadata | Outil d'injection de dépendances pour TypeScript et Javascript                  |
| helmet                    | Aide à sécuriser l'applications en définissant divers en-têtes HTTP.            |
| hpp                       | Protection contre les attaques par pollution des paramètres HTTP                |
| morgan                    | Middlware de journalisation des requêtes HTTP pour node.                        |
| winston                   | Systéme de journalisation génerale                                              |
| winston-daily-rotate-file | Un transport pour winston qui log dans des fichier rotatif                      |
| swagger-jsdoc             | Librairie pour swagger                                                          |
| swagger-ui-express        | Librairie pour interface swagger                                                |

### `devDependencies`

| Package        | Description                                                                                               |
| -------------- | --------------------------------------------------------------------------------------------------------- |
| @types         | Les dépendances dans ce dossier sont des fichiers `.d.ts` utilisés pour fournir des types                 |
| chai           | Bibliothèque qui facilite l'écriture des tests                                                            |
| nodemon        | Utilitaire qui redémarre automatiquement node lorsque les fichier sont modifiées                          |
| supertest      | Bibliothèque d'assertion HTTP. (test)                                                                     |
| ts-node        | Permet d'exécuter directement les fichiers TS                                                             |
| typescript     | Compilateur et vérificateur de type JavaScript                                                            |
| mocha          | Test framework pour Node.js                                                                               |
| cross-env      | Exécuter des scripts qui définissent et utilisent des variables d'environnement sur plusieurs plateformes |
| tsconfig-paths | Charger les modules dont l'emplacement est spécifié dans la section paths de tsconfig.json                |
| tsc-alias      | Remplacer les chemins d'alias par des chemins relatifs après la compilation de typescript                 |
