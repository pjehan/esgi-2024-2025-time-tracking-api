# TimeTracking API

## Création du projet

### Installation avec Express Generator

```bash
npx express-generator --git --no-view time-tracking-api
cd time-tracking-api
npm install
npm audit fix --force # Fix audit issues (optional)
```

Il est ensuite possible de faire un refactoring du code
pour utiliser la syntaxe ES6.

### Chargement des variables d'environnement

Modifier le fichier package.json pour modifier la commande de démarrage du serveur.

```json
"scripts": {
  "start": "node --env-file=.env --env-file=.env.local ./bin/www"
}
```
