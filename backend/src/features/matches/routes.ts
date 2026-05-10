import { Router } from 'express';
import { prisma } from '../../db/prisma';

const router = Router();

router.get('/', async (req, res) => {
  const userId = (req.query.userId as string) || '1';
  
  // Fetch real matches from the DB
  const matches = await prisma.match.findMany({
    where: {
      OR: [
        { user1Id: userId },
        { user2Id: userId }
      ]
    },
    include: {
      user1: { include: { photos: true } },
      user2: { include: { photos: true } },
      messages: {
        orderBy: { createdAt: 'desc' },
        take: 1
      }
    }
  });

  // Fetch likes (users who swiped RIGHT on us but not matched yet)
  // For simplicity in this demo, we'll just show some users as 'likes'
  const potentialLikes = await prisma.user.findMany({
    where: {
      id: { not: userId }
    },
    include: { photos: true },
    take: 5
  });

  res.json({
    matches: matches.map((m) => {
      const otherUser = m.user1Id === userId ? m.user2 : m.user1;
      return {
        id: m.id,
        name: otherUser.display_name,
        photo: otherUser.photos[0]?.url || 'https://picsum.photos/100/100',
        lastMessage: m.messages[0]?.content || 'Say hi!',
        time: m.matchedAt.toLocaleTimeString(),
        unread: m.messages[0]?.seen === false
      };
    }),
    likes: potentialLikes.map(u => ({
      id: u.id,
      name: u.display_name,
      photo: u.photos[0]?.url || 'https://picsum.photos/200/300',
      college: u.college,
      reaction: '🔥'
    })),
  });
});

router.delete('/:id', (req, res) => {
  res.json({ message: 'Unmatched' });
});

export default router;
