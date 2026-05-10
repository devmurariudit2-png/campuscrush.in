import { Router } from 'express';
import { getDb } from '../../db/dbManager';

const router = Router();

router.get('/', (req, res) => {
  const db = getDb();
  res.json({
    matches: db.matches,
    likes: db.users.slice(1), // Mock: everyone except the first user liked you
  });
});

router.delete('/:id', (req, res) => {
  res.json({ message: 'Unmatched' });
});

export default router;
