## Node4T [![Build Status](https://travis-ci.org/qfdk/Node4T.svg?branch=master)](https://travis-ci.org/qfdk/Node4T)

Dans le cadre de **Base de données avancés**, utilisant la technologie de NoSQL pour faire une application qui permet de récupérer des données en utilisant l'API de Twitter.  `BootStrap` pour l'interface grapique et `socket.io` pour trader des événements, `couchdb` pour le stockage.

### Keyworlds
- Node.js
- Socket.io
- API Twitter
- couchDB (required)
- Bootstrap

### Quick Start

1. Allez vers ce site [Apps Twitter](https://apps.twitter.com), puis inscrirez vous sur ce site.
2. Créez une nouvelle application.
3. Renplacez ***Access Token*** dans le fichier `server.js`
4. Lancez la commande `npm install&&npm start`

### Usage
Ajouter un fichier `config.js` dans la racine.

```javascript
const Access_Token = '...';
const Access_Token_Secret = '...';
const Consumer_Key = '...';
const Consumer_Secret = '...';

module.exports = {
    consumer_key: Consumer_Key,
    consumer_secret: Consumer_Secret,
    access_token: Access_Token,
    access_token_secret: Access_Token_Secret,
    timeout_ms: 60 * 1000,
    }
```

Puis lancez la commande suivante.

```bash
git clone https://github.com/qfdk/Node4T.git
cd Node4T
npm install && npm start
```

### Example

Un serveur local va lancer via la port 3000,
pour y accéder http://localhost:3000.

![](./img/Snip20160308_2.png)

### Todo list
* créer un fichier de configuration.

### History
- 2016.3.8 Intégration continue Travis-ci && ajouter des buttons



qfdk<br/>
2016-3-8

