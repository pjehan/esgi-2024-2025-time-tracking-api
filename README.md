# TimeTracking API

## Installation du projet

```bash
npm install
docker compose up
npm start
```

Ouvrir le navigateur sur l'adresse http://localhost:3000/

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

### Redémarrage automatique du serveur

Modifier le fichier package.json pour modifier la commande de démarrage du serveur.

```json
"scripts": {
  "start": "node --env-file=.env --env-file=.env.local --watch ./bin/www"
}
```

### Mise en place de MongoDB avec Docker

Créer un fichier docker-compose.yml à la racine du projet.

```yaml
version: '3.7'

services:
  mongodb:
    image: mongo:7.0.4
    restart: on-failure
    volumes:
      - ./data:/data/db
    ports:
      - "27017:27017"
```
