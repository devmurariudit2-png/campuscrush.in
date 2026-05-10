import { Router } from 'express';

const router = Router();

router.get('/:match_id', (req, res) => {
  res.json({ messages: [] });
});

router.post('/:match_id', (req, res) => {
  res.json({ message: 'Message sent' });
});

router.post('/:match_id/voice', (req, res) => {
  res.json({ message: 'Voice message sent' });
});

export default router;
