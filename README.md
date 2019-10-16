# STI-project

Dépendances de déploiement : 
- bash
- Docker
- Docker-compose

Dépendances de développement : 
- NodeJS
- npm

Déploiement de l'application : 

1. Lancer le script "deploy.sh", qui s'occupe de générer une clée de chiffrement aléatoire pour les sessions du backend, ainsi que de copier la base de données initiale.
3. Lancer l'application à l'aide de `docker-compose up` à la racine du projet

NB : le port par defaut de l'application peut etre changé au niveau du fichier `docker-compose.yml`, à la racine du projet, en changeant le port sortant 

Utilisation initial de l'application :

1. Ouvrir le site web sur un navigateur (par défaut, `localhost:3000`)
2. Se connecter avec les credentials par défaut : 
- Username : `admin`
- Password : `password`

3. Créer tous les comptes necessaires depuis le menu d'administration du compte privilégié

