---
author: Filipe Fortunato & Jonathan Zaehringer
title: Présentation
subtitle: Système de messagerie web
theme: blood
parallaxBackgroundImage: "assets/img/background_img.jpg"
parallaxBackgroundSize: "1920px 1080px"
revealjs-url: "https://revealjs.com"
header-includes : |
    <link rel="stylesheet" href="assets/custom.css">
---

::: notes
Nous allons vous présenter notre système de messagerie WEB
:::

# Technologie

::: notes
Pour commencer, nous allons rapidement vous présenter les téchnologies que nous avons utiliser.
:::


## Frontend

- vuejs
- vuetify
- axios
- moment

![](assets/img/vuejs.png){ style="width: 30%" }

::: notes
Dans le cadre du frontend, nous avons utilisé Vuejs qui est un framework javascript permettant de faire une application `single page` c'est à dire sans avoir de rechargement pour accéder à une nouvelle page.
En permettant une décomposition des éléments d'une page pour qu'il soit réutilisable.

Nous avons utiliser les libraires suivante:

- vuetify est un framework UI mettant à disposition un grande nombre de composant (formulaire, bouton, list, card, menu, etc)
- axios est le fondement du javascript modern en terme de requête asynchrone
- moment est une libraire de travail du temps permettant des affichages sympatiques
:::

## Backend

![](assets/img/node.png){ style="width: 70%" }

::: notes

:::

### Express.js

# Base de données

::: notes
Nous allons maintenant parler de la base de données que nous avons implémenter dans ce projet
:::

## SQLite 3

::: notes
Nous avons décider d'utiliser SQLite 3 pour faire le stockage des données
:::

## Schema

::: notes
Nous allons maintenant vous présenter les schéma de la base de données sous une forme simple pour avoir les informations correctes de typages
:::

## Schema `Users`

```javascript
{
    id: INTEGER PRIMARY,
    username: VARCHAR UNIQUE,
    first_name: VARCHAR,
    last_name: VARCHAR,
    digest_password: VARCHAR,
    active: INTEGER,
    deleted: INTEGER,
}
```

Mot de passe hashé avec sha256

::: notes
Voici le schema de la table Users, contenant diverse information convernant l'utilisateur, ces privilèges et son status. Nous avons pris le choix de faire un système de `soft-delete` pour éviter la perte de données message.
:::

## Schema `Messages`

```javascript
{
    id: INTEGER PRIMARY,
    from: INTEGER FOREIGN(users.id),
    to: INTEGER FOREIGN(users.id),
    subject: VARCHAR,
    message: VARCHAR,
    read: INTEGER,
    timestamp: INTEGER,
}
```

::: notes
Voici pour le schema de la table Messages, nous stockant un état de lecture pour pouvoir dire si le destinataire a lu le message.
:::


# Authentification

::: notes

:::

## Cookie

```json
{
    "user_id": Number,
    "level": Number,
    "iv": String,
    "encryptedData": String,
}
```

- `encryptedData` contient la session

::: notes

:::

## Session

est stocké 

::: notes

:::

## AES256 CBC

Server key

::: notes

:::

## Middleware

Appelé à chaque requête

::: notes

:::

# Navigation

::: notes
Nous allons vous parler ici de l'aspect navigation qui est un peu particulier dans notre projet.
:::

## Backend `Expressjs`

API `RESTful GET/POST/PUT/DELETE`

::: notes

:::

## Router

- Router primitif liant une ressource &rarr; une fonction.
- Définition de route `RESTful`
- Accepte l'injection d'argument dans la ressource

::: notes

:::

## Frontend `Vuejs`

Framework &nbsp;`single page`

Sans rechargement

::: notes
Pour la partie Frontend, vuejs permettant de faire des `single page` c'est à dire une page sans rechargement.
Il n'est pas nécessaire d'avoir un système de routage.
Toutefois, vuejs propose un router fictif permettant à l'utilisateur de voir ce changement et d'intéragire avec s'il le souhaite

Dans le cadre de notre conception docker, nous n'avons pas pu fournir cette intéraction avec l'url car elle demande d'avoir un serveur dédié à cela et non pas qu'il soit déservis par l'API.
:::

## Router

Système de routage fictif dans &nbsp;`router.js`

```javascript

{
    path: '/login',
    name: 'login',
    component: () => import('./views/Login.vue'),
},
```

::: notes
Ce système de routage fictif est définir comme ceux-ci dans le fichier router.js. On y défini le chemin d'accès, son nom et la "Vue" devant être charger dans le template.
:::

## Appel à l'API

Données envoyées/reçues de manière asynchrone

Grace à &nbsp;`Axios`

::: notes
Qui dit application `single page` dit chargement des données de manière asynchrone par le biais d'une libraire nommé `Axios` qui est un wrapper de l'API javascript pour faire des requetes asynchrone XHR.
:::

# Démo

