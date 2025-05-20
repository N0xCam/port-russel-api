import assert from 'assert';
import fetch from 'node-fetch';

//* Test permettant de retourner les catways */
describe('Catways API', function () {
  it('GET /api/catways doit retourner un tableau', async function () {
    const res = await fetch('http://localhost:3000/api/catways', {
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MjVhMjQ5YTc5MjEyMThhMTVkMzM5OCIsImlhdCI6MTc0NzcyOTk5MywiZXhwIjoxNzQ3ODE2MzkzfQ.Y8ZiA2AHoE_0wZ3in3BxbQRPYf9LT-6-eXyKjS2MgEU'
      }
    });

    const body = await res.json();

    assert.strictEqual(res.status, 200);
    assert.ok(Array.isArray(body));
  });
});



//* Test permettant de créer un nouveau catway (avec token)*/ 
const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MjVhMjQ5YTc5MjEyMThhMTVkMzM5OCIsImlhdCI6MTc0NzcyOTk5MywiZXhwIjoxNzQ3ODE2MzkzfQ.Y8ZiA2AHoE_0wZ3in3BxbQRPYf9LT-6-eXyKjS2MgEU'; // ← à remplacer

describe('Catways API', function () {
  it('GET /api/catways doit retourner un tableau', async function () {
    const res = await fetch('http://localhost:3000/api/catways', {
      headers: { Authorization: token }
    });
    const body = await res.json();
    assert.strictEqual(res.status, 200);
    assert.ok(Array.isArray(body));
  });

  it('POST /api/catways doit créer un nouveau catway', async function () {
    const newCatway = {
      catwayNumber: Math.floor(Math.random() * 1000), // numéro unique aléatoire
      type: 'short',
      catwayState: 'en bon état'
    };

    const res = await fetch('http://localhost:3000/api/catways', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      },
      body: JSON.stringify(newCatway)
    });

    const body = await res.json();

    assert.strictEqual(res.status, 201);
    assert.strictEqual(body.catway.catwayNumber, newCatway.catwayNumber);
    assert.strictEqual(body.catway.type, newCatway.type);
    assert.strictEqual(body.catway.catwayState, newCatway.catwayState);
  });
});


//* Test permettant de modifier un catway existant*/
it('PUT /api/catways/:id doit modifier un catway', async function () {
  // 1. Créer d'abord un catway à modifier
  const newCatway = {
    catwayNumber: Math.floor(Math.random() * 1000),
    type: 'short',
    catwayState: 'à modifier'
  };

  const createRes = await fetch('http://localhost:3000/api/catways', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    },
    body: JSON.stringify(newCatway)
  });

  const created = await createRes.json();
  const id = created.catway._id;

  // 2. Modifier ce catway
  const updatePayload = {
    type: 'long',
    catwayState: 'modifié avec succès'
  };

  const updateRes = await fetch(`http://localhost:3000/api/catways/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    },
    body: JSON.stringify(updatePayload)
  });

  const updated = await updateRes.json();

  // 3. Vérifications
  assert.strictEqual(updateRes.status, 200);
  assert.strictEqual(updated.catway.type, 'long');
  assert.strictEqual(updated.catway.catwayState, 'modifié avec succès');
});



//* Test permettant de supprimer un catway */
it('DELETE /api/catways/:id doit supprimer un catway', async function () {
  // 1. Créer un catway à supprimer
  const newCatway = {
    catwayNumber: Math.floor(Math.random() * 1000),
    type: 'short',
    catwayState: 'à supprimer'
  };

  const createRes = await fetch('http://localhost:3000/api/catways', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    },
    body: JSON.stringify(newCatway)
  });

  const created = await createRes.json();
  const id = created.catway._id;

  // 2. Supprimer le catway
  const deleteRes = await fetch(`http://localhost:3000/api/catways/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: token
    }
  });

  const result = await deleteRes.json();

  // 3. Vérification
  assert.strictEqual(deleteRes.status, 200);
  assert.strictEqual(result.message, 'Catway supprimé.');
});


//* Test permettant de récupérer un seul catway */
it('GET /api/catways/:id doit retourner le catway correspondant', async function () {
  // 1. Créer un catway
  const newCatway = {
    catwayNumber: Math.floor(Math.random() * 1000),
    type: 'long',
    catwayState: 'visible'
  };

  const createRes = await fetch('http://localhost:3000/api/catways', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    },
    body: JSON.stringify(newCatway)
  });

  const created = await createRes.json();
  const id = created.catway._id;

  // 2. Récupérer ce catway par son ID
  const getRes = await fetch(`http://localhost:3000/api/catways/${id}`, {
    headers: {
      Authorization: token
    }
  });

  const found = await getRes.json();

  // 3. Vérification
  assert.strictEqual(getRes.status, 200);
  assert.strictEqual(found._id, id);
  assert.strictEqual(found.catwayNumber, newCatway.catwayNumber);
  assert.strictEqual(found.type, newCatway.type);
  assert.strictEqual(found.catwayState, newCatway.catwayState);
});


//* Test permettant de créer une réservation sur un catway existant /*
it('POST /api/catways/:id/reservations doit créer une réservation', async function () {
  // 1. Créer un catway pour y lier la réservation
  const newCatway = {
    catwayNumber: Math.floor(Math.random() * 1000),
    type: 'short',
    catwayState: 'prêt à accueillir un bateau'
  };

  const createRes = await fetch('http://localhost:3000/api/catways', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    },
    body: JSON.stringify(newCatway)
  });

  const created = await createRes.json();
  const catwayNumber = created.catway.catwayNumber;

  // 2. Préparer la réservation
  const reservation = {
    clientName: 'Capitaine Sly',
    boatName: 'Calypso des mers',
    checkIn: new Date().toISOString(),
    checkOut: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString() 
  };

  // 3. Créer la réservation
  const res = await fetch(`http://localhost:3000/api/catways/${catwayNumber}/reservations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    },
    body: JSON.stringify(reservation)
  });

  const body = await res.json();

  // 4. Vérifications
  assert.strictEqual(res.status, 201);
  assert.strictEqual(body.reservation.clientName, reservation.clientName);
  assert.strictEqual(body.reservation.boatName, reservation.boatName);
});


//* Test permettant de récupérer toutes les réservations liées à un catway précis */
it('GET /api/catways/:id/reservations doit retourner les réservations du catway', async function () {
  // 1. Créer un catway
  const newCatway = {
    catwayNumber: Math.floor(Math.random() * 1000),
    type: 'long',
    catwayState: 'réservable'
  };

  const createRes = await fetch('http://localhost:3000/api/catways', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    },
    body: JSON.stringify(newCatway)
  });

  const created = await createRes.json();
  const catwayNumber = created.catway.catwayNumber;

  // 2. Créer une réservation dessus
  const reservation = {
    clientName: 'Buck',
    boatName: 'Calypso des mers',
    checkIn: new Date().toISOString(),
    checkOut: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString()
  };

  await fetch(`http://localhost:3000/api/catways/${catwayNumber}/reservations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    },
    body: JSON.stringify(reservation)
  });

  // 3. Récupérer les réservations du catway
  const res = await fetch(`http://localhost:3000/api/catways/${catwayNumber}/reservations`, {
    headers: {
      Authorization: token
    }
  });

  const reservations = await res.json();

  // 4. Vérifications
  assert.strictEqual(res.status, 200);
  assert.ok(Array.isArray(reservations));
  assert.ok(reservations.length > 0);
  assert.strictEqual(reservations[0].clientName, 'Buck');
});


//* Test permettant de vérifier que l'ID retourne une réservation */
it('GET /api/catways/:id/reservations/:idReservation doit retourner une réservation', async function () {
  // 1. Créer un catway
  const newCatway = {
    catwayNumber: Math.floor(Math.random() * 1000),
    type: 'short',
    catwayState: 'OK'
  };

  const createRes = await fetch('http://localhost:3000/api/catways', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    },
    body: JSON.stringify(newCatway)
  });

  const created = await createRes.json();
  const catwayNumber = created.catway.catwayNumber;

  // 2. Créer une réservation
  const reservation = {
    clientName: 'Alexia',
    boatName: 'La Petite Sirène',
    checkIn: new Date().toISOString(),
    checkOut: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString()
  };

  const resCreate = await fetch(`http://localhost:3000/api/catways/${catwayNumber}/reservations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    },
    body: JSON.stringify(reservation)
  });

  const { reservation: createdReservation } = await resCreate.json();
  const idReservation = createdReservation._id;

  // 3. Récupérer la réservation par ID
  const res = await fetch(`http://localhost:3000/api/catways/${catwayNumber}/reservations/${idReservation}`, {
    headers: {
      Authorization: token
    }
  });

  const result = await res.json();

  // 4. Vérifications
  assert.strictEqual(res.status, 200);
  assert.strictEqual(result._id, idReservation);
  assert.strictEqual(result.boatName, reservation.boatName);
});


//* Test permettant de supprimer une réservation */
it('DELETE /api/catways/:id/reservations/:idReservation doit supprimer une réservation', async function () {
  // 1. Créer un catway
  const newCatway = {
    catwayNumber: Math.floor(Math.random() * 1000),
    type: 'long',
    catwayState: 'libre'
  };

  const createCatwayRes = await fetch('http://localhost:3000/api/catways', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    },
    body: JSON.stringify(newCatway)
  });

  const created = await createCatwayRes.json();
  const catwayNumber = created.catway.catwayNumber;

  // 2. Créer une réservation
  const reservation = {
    clientName: 'Caly',
    boatName: 'Le Mystique',
    checkIn: new Date().toISOString(),
    checkOut: new Date(Date.now() + 86400000).toISOString() // +1 jour
  };

  const createRes = await fetch(`http://localhost:3000/api/catways/${catwayNumber}/reservations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    },
    body: JSON.stringify(reservation)
  });

  const { reservation: createdReservation } = await createRes.json();
  const idReservation = createdReservation._id;

  // 3. Supprimer la réservation
  const deleteRes = await fetch(`http://localhost:3000/api/catways/${catwayNumber}/reservations/${idReservation}`, {
    method: 'DELETE',
    headers: {
      Authorization: token
    }
  });

  const result = await deleteRes.json();

  // 4. Vérifications
  assert.strictEqual(deleteRes.status, 200);
  assert.strictEqual(result.message, 'Réservation supprimée.');
});
