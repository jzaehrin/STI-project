## CSRF

Les attaques CSRF sont problématiques dans ce cas, car aucune protection n'est présente (token, CORS).
Cependant l'application utilise une API qui n'accepte que du JSON.
Cela complique largement le problème, car il est déjà impossible sur un navigateur moderne d'appeler de manière asynchrone une route qui ne définit pas de CORS.

La seule possibilité est l'attaque par un formulaire classique qui lui redirige le client sur l'API.

### Formulaire d'exemple

```html
<html>
    <body>
        <form method="POST" action="http://localhost:3000/message" enctype="application/json">
            <input type="number" name='to' value='1'/>
            <input type="text" name='subject' value="CRSF PWNED" />
            <input type="text" name='message' value='HAHAH' />
            <input type="submit" />
        </form>
        <form method="POST" action="http://localhost:3000/message">
            <input type="number" name='to' value='1' />
            <input type="text" name='subject' value="CRSF PWNED" />
            <input type="text" name='message' value='HAHAH' />
            <input type="submit" />
        </form>
        <form method="POST" action="http://localhost:3000/message" enctype="text/plain">
            <input type="text" name='{"to":1,"subject":"CRSF PWNED", "message":"' value='HAHAH"}' />
            <input type="submit" />
        </form>
        <form method="POST" action="http://localhost:3000/message" enctype="application/json">
            <input type="text" name='{"to":1,"subject":"CRSF PWNED", "message":"' value='HAHAH"}' />
            <input type="submit" />
        </form>
    </body>
</html>
```

### Mitigation

Dans ce cas, expressjs semble sauvé la situation, car il est très strict sur la forme des données ce qui bloque ces états.
Pour le 3ème formulaire, un JSON valide (`{"to":1,"subject":"CRSF PWNED", "message":"=HAHAH"}`) est envoyer mais avec un mime-type `text/plain` mais cela n'est pas accepter par express.
Dans le cas d'autres technologies comme `spring`, cette attaque est totalement possible.
Dans le 4ème formulaire, le résultat n'est clairement pas compris par express.

Par contre, dans le cas du premier formulaire qui n'est pas standard, mais n'a pas d'impact sur le type de contenu (`application/x-www-form-urlencoded`).
L'erreur qui survient est une mauvaise construction du parser d’expressjs qui fournit un objet null donc le prototype contient les champs envoyés.
Le problème provient de la présence du parser mais le code n'est fait uniquement pour parser du JSON ce qui fait planter lors de l'envoi de ces données.

Cela n'a pas d'impact car le code suivant fait planter la requête :

```javascript
if (!req.body.hasOwnProperty('to') || !req.body.hasOwnProperty('subject') || !req.body.hasOwnProperty('message')) {
    res.sendStatus(400);
    return;
}
```

Dans ce cas, la fonction `hasOwnProperty` n'existe pas et crée une erreur `500`.
Cependant cela pourrait être exploité au cas de faille dans le parser, il est donc nécessaire de corriger cela en supprimant la ligne `app.use(express.urlencoded({ extended: false }));`.

Pour conclure, le site n'est pas attaquable par CSRF car express est suffisamment rigoureux pour ne pas laisser passer des JSON forger par du HTML.
