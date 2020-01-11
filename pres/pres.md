---
author: Mickael Bonjour & Jonathan Zaehringer
title: Présentation
subtitle: Système de messagerie web sécurisé
theme: blood
parallaxBackgroundImage: "assets/img/background_img.jpg"
parallaxBackgroundSize: "1920px 1080px"
revealjs-url: "https://revealjs.com"
header-includes : |
    <link rel="stylesheet" href="assets/custom.css">
---

# STI - Projet 2

# Table des matières

- Introduction
- Analyse de Menace
- CSRF
- Bad crypto
- Echec
- Conclusion

# Introduction

- frontend SPA en vuejs
- backend API RESTful en expressjs 

::: notes
Le projet initiale a été développer avec un frontend en Single Page App en vuejs et une API RESTful en expressjs.

Nous allons vous présenter les attaques intéressantes que nous avons pu faire sur cette infrastructure.
:::

# Analyse de Menace

## DFD

![DFD](assets/img/DFD.png)

::: notes
Nous pouvons rapidement voir la frontière de confiance qui se trouve réellement au niveau du backend.

On voit bien que les attaques peuvent être faite directement sur le backend sans passer par le frontend.
:::

## Point critique

- L'intégrité
- La confidentialité

::: notes
Si une faille permet de lire/modifier/envoyer des messages sans être autorisé à accéder à ce compte, cela est extremement critique et peut détruire le service.
:::

# CSRF

## Prerequis

- pas de cross-origin
- JSON valide

::: notes
Le frontend est fourni par le backend ce qui permet de ne pas avoir de CORS défini ce qui implique une certaine sécurité.

L'API ne travail uniquement en JSON ce qui impose donc de pouvoir envoyer du JSON par un formulaire HTML.
:::

## Tentative d'attaique

```html
<form method="POST" action="http://localhost:3000/message" enctype="text/plain">
    <input type="text" name='{"to":1,"subject":"CRSF ", "message":"' value='pwned"}' />
    <input type="submit" />
</form>
```

::: notes
Il n'est pas possible d'envoyer du JSON de manière standard. mais il est possible d'abuser de certaine option.

Ce formulaire permet parfois de profiter de faille de type CSRF, dans notre cas cela n'a pas fonctionner.
:::

##

```html
<form method="POST" action="http://localhost:3000/message" enctype="application/json">
    <input type="number" name='to' value='1'/>
    <input type="text" name='subject' value="CRSF PWNED" />
    <input type="text" name='message' value='HAHAH' />
    <input type="submit" />
</form>
```

::: notes
Sur chrome, il est possible de faire ce type de formulaire qui n'est pas standard mais qui utilise un fonctionnement qui est en cours de discussion dans les standards du WEB.

Il permet d'envoyer un JSON valide au premier abord mais cependant cela n'a pas fonctionner.
Expressjs n'arrive pas à le parse de manière classique et créer un objet null qui fait planter la suite du programme.
:::

# Bad crypto

::: notes

:::

# Echec

- XSS - vuejs sanitize tout input
- Injection SQL - Sécurisé par Prepare Statements

::: notes

:::

# Conclusion

- Technologie moderne

::: notes

:::

# Question
