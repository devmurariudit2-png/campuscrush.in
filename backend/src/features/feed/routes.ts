import { Router } from 'express';
import { prisma } from '../../db/prisma';

const router = Router();

router.get('/', async (req, res) => {
  const userId = req.query.userId as string;
  // Simple algorithm: show all users except self (if provided)
  const feed = await prisma.user.findMany({
    where: {
      id: { not: userId }
    },
    include: {
      photos: true,
      prompts: true,
    }
  });
  res.json(feed);
});

export default router;
