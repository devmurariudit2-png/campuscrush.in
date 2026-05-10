import { Router } from 'express';
import { prisma } from '../../db/prisma';

const router = Router();

router.get('/', async (req, res) => {
  const userId = (req.query.userId as string) || '1';
  const user = await prisma.user.findUnique({
    where: { id: userId }
  });
  res.json({ balance: user?.coins || 0 });
});

router.post('/spend', async (req, res) => {
  const userId = (req.body.userId as string) || '1';
  const amount = Number(req.body.amount) || 10;
  
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (user && user.coins >= amount) {
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          coins: { decrement: amount }
        }
      });
      res.json({ balance: updatedUser.coins });
    } else {
      res.status(400).json({ message: 'Insufficient coins' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
