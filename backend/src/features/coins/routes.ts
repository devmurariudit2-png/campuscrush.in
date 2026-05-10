import { Router } from 'express';
import { getDb, saveDb } from '../../db/dbManager';

const router = Router();

router.get('/', (req, res) => {
  const db = getDb();
  const userId = req.query.userId || '1';
  const user = db.users.find(u => u.id === userId);
  res.json({ balance: user?.coins || 0 });
});

router.post('/spend', (req, res) => {
  const db = getDb();
  const userId = req.body.userId || '1';
  const amount = req.body.amount || 10;
  const user = db.users.find(u => u.id === userId);
  if (user && user.coins >= amount) {
    user.coins -= amount;
    saveDb(db);
    res.json({ balance: user.coins });
  } else {
    res.status(400).json({ message: 'Insufficient coins' });
  }
});

export default router;
