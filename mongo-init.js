db = db.getSiblingDB('nodemongotest');

db.createUser({
  user: 'dbtest',
  pwd: 'password',
  roles: [{ role: 'readWrite', db: 'nodemongotest' }],
});
