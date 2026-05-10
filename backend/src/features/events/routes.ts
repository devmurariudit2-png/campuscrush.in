import { Router } from 'express';
import { getDb, saveDb } from '../../db/dbManager';

const router = Router();

router.get('/', (req, res) => {
  const db = getDb();
  const college = req.query.college;
  let events = db.events;
  if (college) {
    events = events.filter(e => e.college_filter === college);
  }
  res.json(events);
});

router.post('/:id/rsvp', (req, res) => {
  const db = getDb();
  const event = db.events.find(e => e.id === req.params.id);
  if (event) {
    event.rsvps += 1;
    saveDb(db);
    res.json(event);
  } else {
    res.status(404).json({ message: 'Event not found' });
  }
});

export default router;
