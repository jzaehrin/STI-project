# Conclusion

Pour conclure ce rapport, nous avons pu voir les points critiques de l'application.
L'intégrité et la confidentialité sont des points essentiels à cette application.

Une seule faille s'est avérée possible à exploiter.
Une erreur dans la conception du token de session chiffrée a été découverte.
Cette faille ne permet pas de devenir, `admin` mais permet de lire les messages de certains utilisateurs et même d'utiliser leur compte.
Cela reste très grave pour l'application.

Hormis cette faille, l'application se voit être relativement bien sécurisée.
L'utilisation de bonne pratique comme les `prepared statements` permet d'éviter toutes injections SQL.
De plus, il est important de noter qu’un grand nombre de failles ne sont pas présentes par le faite que les technologies sont récentes et protègent automatiquement de ces attaques si on ne cherche pas à le désactiver.
L'aspect strict de `expressjs` concernant les requêtes HTTP protège contre les CSRF en évitant de considérer du JSON avec un `mime type` incorrect.
Ainsi que `vuejs` qui s'occupe de `sanitize` l'ensemble des données affichées à l'utilisateur pour éviter tout problème comme des XSS.

On pourra conclure par le faîte que l'utilisation de technologies moderne ayant été penser dans le cadre actuel d'attaque permet d'éviter un grand nombre d'attaques "simple".
Toutefois, cela n'est pas magique, il est nécessaire de faire attention, car cela n'est pas forcément le cas. Il faut donc nécessairement tester pour s'assurer que les protections existent et qu'elles sont correctement utilisées.
