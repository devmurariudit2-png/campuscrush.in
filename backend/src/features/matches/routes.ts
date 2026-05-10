import { Router } from 'express';
import { getDb } from '../../db/dbManager';

const router = Router();

router.get('/', (req, res) => {
  const db = getDb();
  res.json({
    matches: db.matches.map((m: any) => ({
      id: m.id,
      name: m.display_name || m.name || 'Unknown',
      photo: (m.photos && m.photos.length > 0) ? m.photos[0].url : 'https://picsum.photos/100/100',
      lastMessage: 'Say hi!',
      time: 'Just now',
      unread: true
    })),
    likes: db.users.slice(1).map(u => ({
      id: u.id,
      name: u.display_name,
      photo: (u.photos && u.photos.length > 0) ? u.photos[0].url : 'https://picsum.photos/200/300',
      college: u.college,
      reaction: '🔥'
    })),
  });
});

router.delete('/:id', (req, res) => {
  res.json({ message: 'Unmatched' });
});

export default router;
