import { Router } from 'express';

const router = Router();

router.post('/', (req, res) => {
  res.json({ message: 'Crush sent' });
});

router.post('/voice/:swiped_id', (req, res) => {
  res.json({ message: 'Voice reaction sent' });
});

export default router;
