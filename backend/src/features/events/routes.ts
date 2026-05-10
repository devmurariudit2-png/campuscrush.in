import { Router } from 'express';
import { prisma } from '../../db/prisma';

const router = Router();

router.get('/', async (req, res) => {
  const college = req.query.college as string;
  const events = await prisma.event.findMany({
    where: college ? { college } : {}
  });
  res.json(events);
});

router.post('/:id/rsvp', async (req, res) => {
  try {
    const event = await prisma.event.update({
      where: { id: req.params.id },
      data: {
        rsvps: { increment: 1 }
      }
    });
    res.json(event);
  } catch (error) {
    res.status(404).json({ message: 'Event not found' });
  }
});

export default router;
