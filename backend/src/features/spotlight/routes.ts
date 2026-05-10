import { Router } from 'express';

const router = Router();

router.get('/:college', (req, res) => {
  res.json({ spotlight: [] });
});

export default router;
