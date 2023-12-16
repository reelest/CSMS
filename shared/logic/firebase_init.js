export let firestore, storage, auth, firestoreNS;

export function setFirebase({
  firestore: _firestore,
  storage: _storage,
  auth: _auth,
  firestoreNS: _firestoreNS,
}) {
  firestore = _firestore;
  storage = _storage;
  auth = _auth;
  firestoreNS = _firestoreNS;
}
