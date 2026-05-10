import { Router } from 'express';

const router = Router();

router.put('/contact', (req, res) => {
  res.json({ message: 'Contact updated' });
});

router.post('/log', (req, res) => {
  res.json({ message: 'Meeting logged' });
});

router.post('/checkin/:log_id', (req, res) => {
  res.json({ message: 'Check-in confirmed' });
});

export default router;
