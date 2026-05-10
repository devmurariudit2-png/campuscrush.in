import { Router } from 'express';
import { prisma } from '../../db/prisma';

const router = Router();

router.post('/google', async (req, res) => {
  // Mock login: always return the first user as logged in
  const user = await prisma.user.findFirst({
    include: {
      photos: true,
      prompts: true,
    }
  });
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
