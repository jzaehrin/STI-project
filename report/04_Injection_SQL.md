## Injection SQL

Tentative d'injection SQL sur plusieurs routes de L'API et par l'interface.

### Payload d'exemple

```sql
' OR '1' = '1
```

```sql
'); SELECT * FROM users; --
```

```sql
') UNION SELECT * FROM users;
```

### Mitigation

L'ensemble des requêtes SQL sont faites avec des prepared statements de la libraire `better-sqlite3` en JavaScript.
Il ne semble pas avoir de vulnérabilités sur les prepared statements dans cette libraire ([](https://github.com/JoshuaWise/better-sqlite3)).

