# Elego - SSVE

Système de suggestions de véhicules électriques

_Le reste est sous votre responsabilité..._

La pile technologique actuelle de l'application web. 

- NodeJS
- ExpressJS
- MYSQL
- Angular (CLI)
- Docker et Docker Compose

# Préalable

Il faut avoir au moins la version 9.3.1 de `npm` et Node version majeure 18 sur sa machine pour développer.

**Sur le terminal, afin de manipuler les éléments du projet il faut se positionner à l'intérieur du dossier /frontend ou /backend et installer leurs dépendances respectives.**

> `cd frontend && npm i`  
> `cd ../backend && npm i`

# Back-end

Afin de démarrer le service back-end, il suffit simplement d'exécuter dans le terminal la commande ci-dessous et au préalable
se placer soit dans le dossier /backend soit dans le dossier /frontend :

- `cd frontend` ou
- `cd ../backend`

puis :

> `npm run backend`

**Le back-end s'exécute sur le port "4500"**

# Test Back-end

Les fichiers contenant les tests sont dans le dossier `/tests` qui se trouve a la racine du dossier
`/backend` du projet.  
Voici la procédure à suivre pour exécuter les tests Back-end :

- Se déplacer dans le dossier `/backend`
- Installer les dépendances des tests avec les commandes suivantes :
  > `npm install mocha`  
  > `npm install supertest`
- Démarrer le backend avec cette commande :
  > `npm run backend`
- Ouvrir un autre terminal sur le même dossier et exécuter cette commande :
  > npm run test

# Base de données

Afin d'utiliser le service de base de données MYSQL s'assurer d'avoir une instance de serveur MYSQL démarré en localhost sur le port "3306"

> Username : root

> Password : root

# Front-end

Afin de démarrer le service front-end,il suffit simplement d'executer dans le terminal la commande la commande ci dessous et au prealable se placer soit dans le dossier /backend soit dans le dossier /frontend :

- `cd frontend` ou
- `cd ../backend`

> `npm run frontend`

Visitez le site sur votre navigateur a l'URL:

> `http://localhost:4200`

**_Le front-end s'execute sur le port "4200"_**

# Test Front-end

Voici la procédure à suivre pour exécuter les tests Front-end:

- Se déplacer dans le dossier `/frontend`
- Installer les dépendances des tests avec la commande suivante :
  > npm install karma-jasmine
- Lancer les tests avec la commande suivante :
  > npm run test

# Changelog

- **7 février 2023 v-0.2**
Implémentation d'un module d'animation pour améliorer l'expérience utilisateur lors des différentes liaisons entre les composants
Changement du router outlet pour intégrer les animations :

```
<div [@routeAnimations]="prepareRoute(outlet)">
  <router-outlet #outlet="outlet"></router-outlet>
</div>
```

Création d'un composant d'accueil pour la page d'accueil
Ajout du corps de la page pour une meilleure présentation des données
Mise en place du CSS et du TypeScript pour une implémentation cohérente avec la maquette présentée en cours.

- **5 mars 2023 v-0.2**

implémentation d'un ORM

 - Fait et testé :
1. Installation et configuration de l'ORM Prisma
2. DataType Objects détaillés:

- 
- - filtre
- - itinerary
- - navigation
- - route
- - session
- - vehicle
- - vehicleCandidate
- - waypoint
 
2. Implémentation des Services de chaque DTO : CRUD Generique
3. Implémentation des contrôleurs générique a chaque Service
4. Adaptation de Prisma au cadre de déploiement (fait avec Michael)
5. Système de migration de la base de données
6. Première version complète de la base de données
7. Renommage du dossier partage en Service
8. Modification App.ts : Déplacement du stockage de la session express-mysql-session
9. Update Wiki Prisma et fonctionnalité ORM

- À venir :

1. Travail sur les routeurs
2. Service back-end plus détaillé à la logique d'affaire
3. Service Front-end de session



# Architecture

Afin de démarrer le service front-end et back-end simultanément, simplement ouvrir deux instances de terminal et lancer les deux commandes précédemment énoncées.
Pour le Back-end, en se positionnant dans le dossier "backend" :

- Les **"routes"** sont dans le dossier nommé **"/Routes"**.
- Les **"models"** sont dans le dossier nommé **"/Models"**.
- Les **"scripts de connexion aux sources de données"** sont dans le dossier **"/datasources"**.

Pour le Front-End en se positionnant dans le dossier "frontend"

- Les composants, les services et modules de routing Angular (fichier .ts, .css et .html) sont dans le dossier **"/src"**
- Les fichiers de configuration typescript et angular sont a la racine du dossier (tsconfig\*.json et angular.json)


# Formatage du code
Ce script permet de formater le code dans les dossiers frontend et backend. Il y a trois options pour exécuter
ce script: frontend, backend et all.

## Prérequis
- Avoir installé Node.js sur votre ordinateur
- Avoir installé npm sur votre ordinateur
- Avoir installé Prettier sur votre ordinateur

## Comment l'utiliser
1. Ouvrir le terminal ou invite de commandes
2. Se déplacer dans le dossier où se trouve ce script en utilisant la commande cd
3. Exécuter le script en utilisant l'une des options ci-dessous:
   - Pour formater le dossier frontend:
    > `./run_prettier_format.sh frontend`
   - Pour formater le dossier backend:
    > `./run_prettier_format.sh backend`
   - Pour formater les dossiers frontend et backend:
    > `./run_prettier_format.sh all`
## Documentation
[Prettier Documentation](https://prettier.io/docs/en/index.html)

   

# Node Package Manager

Retrouvez la liste des dépendances du projet dans le fichier package.json, assurez-vous avant de lancer le projet d'avoir installé toutes les dépendances .Il suffit d'exécuter la commande ci-dessous en vous situant au niveau du terminal dans les dossiers /backend et /frontend comme expliqué dans la section PRÉALABLE:

> `npm i`

**Petites notes supplémentaires de la part de _Marcotte-Gourde Yannick_ : en exécutant cette commande, il n'a pas pu installer la dépendance MYSQL et donc n'a pas pu non plus démarrer le service back-end, ainsi pour ceux experiençant le même problème assurez-vous d'exécuter cette commande :**

> `npm install --save mysql`

Node Package Manager est necessaire afin de démarrer le projet, pour l'installer sur Mac/Unices :

> `sudo apt-get install npm`

Sur Windows :

> `msiexec.exe /a https://nodejs.org/dist/latest/node-v19.4.0-x64.msi /quiet`

_ne marche pas pour les conteneurs Windows installés via dockerfile_

**Ou si vous préférez utiliser nvm, un excellent tutoriel d'installation existe a cette URL :** [comment installer nvm sur mac, windows ou linux ?](https://dev.to/csituma/install-nvm-on-mac-windows-and-linux-1aj9)


# Docker et Docker Compose

L'utilisation de Docker Compose (et Docker) est plus pour l'environnement de production, ce n'est pas un environnement de développement idéal.

Mais un des avantages en production est que c'est plus facile de faire des mises à jour en production.

Comme c'est une façon déclarative de décrire l'infrastructure de production, il suffit de changer un fichier texte (`docker-compose.yml`) pour spécifier l'environnement final et de faire une commande (`docker compose up`) pour appliquer les changements.
Donc il n'est pas nécessaire de déterminer les changements manuellement, c'est la commande Docker Compose qui analyse les changements à faire et les applique par lui-même.

Alors c'est mieux qu'un script shell où il faut tout faire et gérer par soi-même, ce qui peut être long et compliqué.
Et c'est une solution pas trop compliquée comparée à d'autres et qui a déjà des fonctionnalités de base, ce qui évite de perdre du temps.

D'autres avantages viennent de l'usage de Docker lui-même, soit l'isolation du système hôte qui permet d'avoir moins de surprises lors de l'exécution surtout couplé avec l'usage des Dockerfile qui permettent de spécifier une image exacte de l'environnement d'exécution sans influence du système hôte.

Tout cela est intégré dans le pipeline dans le stage de déploiement, incluant la construction des images pour le frontend et le backend comme étape avant d'exécuter les commandes sur l'hôte de déploiement.

Comme qu'il y a juste un seul port ouvert sur l'hôte de déploiement et un seul nom de domaine, il faut ajouter un reverse proxy (en d'autres mots, un routeur) sur ce port qui est devant le backend et le frontend pour pouvoir diriger ou router les requêtes au bon endroit (donc, ajouter une autre image pour cela).
Donc la configuration du reverse proxy est donc tout ce qui commence par '/api/' est dirigé vers le backend et le reste va vers le frontend.

L'image Docker 'jonasal/nginx-certbot' est utilisée pour avoir une image qui contient Nginx et certbot, ce qui permet d'obtenir un certificat SSL/TLS de façon automatique auprès de Let's Encrypt pour activer HTTPS.


# Format de requête

Ici, voici les types de requêtes que vous pourrez faire avec l'API du service
par socket. La procédure pour vous y connecter sera décrite d'ici peu au
courant des prochaines semaines. D'ici là voici l'interface générale mise ici
pour vous donner une idée de ce que vous aurez à votre disposition.

Type 3 (3 paramètres)
&lt;coord&gt; &lt;coord&gt; &lt;autonomie&gt;
ex:(45.5254,-73.5555) (45.6243,-73.7378) 355418
&lt;coord&gt; &lt;coord&gt; &lt;autonomie&gt; &lt;jour&gt; &lt;heure&gt;
ex:(45.5254,-73.5555) (45.6243,-73.7378) 355418 5 0
&lt;coord&gt; &lt;coord&gt; &lt;autonomie&gt; &lt;jour&gt; &lt;heure&gt; &lt;charge initiale&gt;
ex:(45.5254,-73.5555) (45.6243,-73.7378) 355418 5 0 75

## Où:

| éléments                | format                                           |
| :---------------------- | :----------------------------------------------- |
| &lt;coord&gt;           | ([-] [[digit]]+.[[digit]]+)                      |
| &lt;autonomie&gt;       | [[digit]]+ -&gt; autonomie du véhicule en mètres |
| &lt;jour&gt;            | [[digit]]{1} -&gt; 0-dimanche, 6-samedi          |
| &lt;heure&gt;           | [[digit]]{1-2} -&gt; 0-minuit, 23-23h            |
| &lt;charge initiale&gt; | [[digit]]{1-3} -&gt; 0 - 100, 0-100%             |

## Le format de retour offre le résultat tel que:

&lt;distance en km&gt; &lt;temps déplacement&gt; &lt;temps attente&gt; &lt;temps recharge&gt;

# Connexion au service des ports 8008 et 8009

Le port 22 est ouvert, donc il est très simple d'ouvrir un tunnel pour accéder
au service sur les ports 8008 (Québec) et 8009 (Montréal)

## Notes aux responsables du serveur

Le serveur est une machine virtuelle qui est
régulièrement redémarrée. Pour que le service soit actif, vous devrez régulièrement
repartir le service. Pour ce faire voici la procédure. 

### Procédure de démarrage des services

Pour que le service roule une fois que vous vous déconnectez du serveur, vous
devez partir les services avec `tmux`. 

Une fois connecté au serveur via SSH :
```bash
cd /opt/veplan
tmux new -s Mtl # Mtl pourrait être n'importe quoi
```

Vous allez avoir une autre console apparaître, à l'intérieur de celle-ci:

```bash
make runServerMtl
```

Le serveur va démarrer... Pour vous détacher de la console faites :
```bash
<ctrl-b> <d>
```
en deux mouvements...

Ensuite répéter l'opération avec le service pour la carte du Québec:

```bash
tmux new -s Qc 
make runServerQc
<ctrl-b> <d>
```
Vous pouvez ensuite quitter le serveur et vos services s'exécuteront en continu. 

### tmux quelques commandes utiles pour gérer tout ça:
Voir les tmux actifs: `tmux ls`
Se reconnecter à un tmux: `tmux attach -t <nom_tmux>`
Pour fermer définitivement un tmux: 
```bash
tmux attach -t <nom_tmux_to_kill>
<ctrl-b> <&> # confirmer la fermeture avec <y>
```


## D'abord, demander un username à votre équipe d'intégration

Ici, c'est le responsable du serveur, qui a des accès admin qui devra vous
aider. Il devra vous créer des identifiants pour vous donner la permission de
vous connecter via SSH.

## Ensuite, ouvrez une console en local et tapez:

```bash
ssh -L 5000:127.0.0.1:8008 username@adve.info.uqam.ca
```

Où bien sûr, "username" est votre username. Entrez votre mot de passe si
nécessaire et si tout se passe bien, vous avez un "tunnel" d'ouvert, de votre
machine au serveur adve.info.uqam.ca.

### ssh -L 5000:127.0.0.1

Dit à la commande ssh d'écouter le port 5000 de votre adresse localhost.

### :8008 username@adve.info.uqam.ca

Et de transférer le tout sur le port 8008 de la machine adve.info.uqam.ca une
fois votre connexion sécurisée par ssh effectué.

Note : si vous rencontrez l'erreur `Cannot assign requested address`, ajoutez l'option `-4` à votre commande afin de forcer le client ssh à utiliser IPV4.

## Il ne reste ensuite qu'à ouvrir une autre console sur votre machine

Votre console est bel et bien sur votre machine locale et n'est pas connectée ssh
sur adve.uqam.info.ca

Donc, de votre console locale, vous pouvez maintenant accéder au port 8008 de
adve.info.uqam.ca en effectuant:

```bash
nc 127.0.0.1 5000
```

D'ici vous pouvez faire vos requêtes via le standard input ou...

```bash
nc 127.0.0.1 5000 < fichierderequêtes.txt
```

Voilà, le problème est réglé.


## Petit tutoriel

Marc Elson, le responsable des machines virtuelles, dont celle de
adve.info.uqam.ca m'a aussi partagé un lien vers un "crash course" qui peut
être utile pour les utilisateurs de *Windows*, je vous le partage ici pour des
fins d'exhaustivité.

[Set up an SSH tunnel](https://www.candelatech.com/cookbook.php?vol=misc&book=Instructions_to_set_up_an_SSH_tunnel)
# Via votre application sur le serveur

Vous n'avez qu'à lancer vos requêtes via le serveur localhost aux ports
associés.
