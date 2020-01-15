## XSS

Nous avons essayé une attaque de type XSS depuis l'interface web ainsi que sur l'API directement.

### Payload d'exemple

```html
<script>
alert(1);
</script>
```

### Mitigation

Aucun résultat n'a été efficace, car Vuejs sanitize l'ensemble des strings qu'il affiche à l'utilisateur.
Aucune vulnérabilité permettant une XSS n'existe depuis décembre 2018 version <2.5.17 ([https://snyk.io/vuln/npm:vue](https://snyk.io/vuln/npm:vue)).

Nous pouvons voir que l'injection du message c'est bien fait dans la base de données :
```json
{
  "message":"<script>\nalert(1);\n</script>",
  "id":12,
  "fromId":5,
  "fromName":"jzaehrin",
  "toId":1,
  "toName":"admin",
  "timestamp":1577785913,
  "subject":"XSS",
  "read":1
}
```

La protection provient bien du moment de l'affichage par le biais de vuejs qui protègent l'utilisateur des données récupérées.
