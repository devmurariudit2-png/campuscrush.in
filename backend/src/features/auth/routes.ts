import { Router } from 'express';
import { getDb } from '../../db/dbManager';

const router = Router();

router.post('/google', (req, res) => {
  const db = getDb();
  // Mock login: always return the first user as logged in
  const user = db.users[0];
  res.json({ 
    user,
    token: 'mock-jwt-token',
  });
});

router.post('/refresh', (req, res) => {
  res.json({ token: 'mock-jwt-token-refreshed' });
});

router.post('/logout', (req, res) => {
  res.json({ message: 'Logged out' });
});

export default router;
