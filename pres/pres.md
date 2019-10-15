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

# Technologie

## Frontend

![](assets/img/vuejs.png){ style="width: 50%" }

::: notes

:::

## Backend

![](assets/img/node.png)

::: notes

:::

### Express.js

# Base de données

::: notes

:::

## SQLite 3

::: notes

:::

## Schema `Users`

```javascript
{
    id: INTEGER PRIMARY,
    username: VARCHAR UNIQUE,
    first_name: VARCHAR,
    last_name: VARCHAR,
    digest_password: VARCHAR(32),
    active: INTEGER,
    deleted: INTEGER,
}
```

Mot de passe hashé avec sha256

::: notes

:::

## Schema `Message`

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

Framework &nbsp;`one page`

Sans rechargement

::: notes

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

:::

## Appel à l'API

Données envoyées/reçues de manière asynchrone

Grace à &nbsp;`Axios`

::: notes

:::

# Démo

