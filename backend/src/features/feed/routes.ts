import { Router } from 'express';
import { getDb } from '../../db/dbManager';

const router = Router();

router.get('/', (req, res) => {
  const db = getDb();
  // Simple algorithm: show all users except self (if provided)
  const userId = req.query.userId;
  const feed = db.users.filter(u => u.id !== userId);
  res.json(feed);
});

export default router;
