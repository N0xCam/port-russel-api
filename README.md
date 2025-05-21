Port Russel API

API RESTful pour la gestion des catways et des réservations du port Russel.

1. Fonctionnalités : 

- Gestion des catways : création, lecture, mise à jour, suppression.
- Gestion des réservations : création, lecture, suppression.
- Authentification via JWT.
- Interface utilisateur intégrée.

2. Technologies utilisées :

- Node.js
- Express.js
- MongoDB avec Mongoose
- Mocha pour les tests
- HTML/CSS/JavaScript pour le front-end

3. Installation

```bash
git clone https://github.com/N0xCam/port-russel-api.git
cd port-russel-api
npm install

4. Lancement

npm node server.js
L'application sera disponible sur http://localhost:3000.

5. Identifiants :

{
  "email": "test@example.com",
  "password": "123456"
}

6. Pour obtenir un token :

POST /api/users/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "123456"
}
Puis ajouter ce header : Authorization: Bearer <TOKEN_ICI>

7. Documentation de l'API

Disponible depuis l'application sur la page de connexion.

8. Lancer les tests

npm test
