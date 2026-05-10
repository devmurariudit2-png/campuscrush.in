import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(__dirname, 'mockDb.json');

export interface MockDb {
  users: any[];
  swipes: any[];
  matches: any[];
  messages: any[];
  events: any[];
}

const DEFAULT_DB: MockDb = {
  users: [
    {
      id: '1',
      email: 'priya@pdeu.ac.in',
      display_name: 'Priya',
      age: 21,
      college: 'PDEU',
      department: 'ICT',
      photos: [
        { url: 'https://picsum.photos/400/600?random=1', caption: 'Sunset at the canteen' },
        { url: 'https://picsum.photos/400/600?random=2', caption: 'Lab days are long days' },
      ],
      prompts: [
        { question: '3AM canteen or sunrise run?', answer: 'Canteen. Always canteen.' },
      ],
      coins: 120,
    },
    {
      id: '2',
      email: 'rahul@daiict.ac.in',
      display_name: 'Rahul',
      age: 22,
      college: 'DAIICT',
      department: 'M.Tech',
      photos: [
        { url: 'https://picsum.photos/400/600?random=4' },
      ],
      prompts: [
        { question: 'My GPA vs my vibe:', answer: 'Vibe is 10/10, GPA is... a secret.' },
      ],
      coins: 50,
    }
  ],
  swipes: [],
  matches: [],
  messages: [],
  events: [
    {
      id: '1',
      title: 'Midnight Canteen Meetup',
      description: 'The legendary ICT canteen is open late tonight. Free chai for the first 10 people.',
      location: 'PDEU Canteen',
      date: 'May 15, 23:00',
      category: 'Social',
      college: 'PDEU',
      college_filter: 'PDEU',
      attendees: 120,
      crushUsers: 42,
      rsvps: 42,
      image: 'https://picsum.photos/600/300?random=33',
    },
    {
      id: '2',
      title: 'Synapse 2026 Intro',
      description: 'Kickoff for DAIICT cultural fest.',
      location: 'OAT, DAIICT',
      date: 'May 20, 18:00',
      category: 'Fest',
      college: 'DAIICT',
      college_filter: 'DAIICT',
      attendees: 300,
      crushUsers: 156,
      rsvps: 156,
      image: 'https://picsum.photos/600/300?random=34',
    }
  ],
};

const getDb = (): MockDb => {
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify(DEFAULT_DB, null, 2));
  }
  return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
};

const saveDb = (db: MockDb) => {
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
};

export default { getDb, saveDb };
export { getDb, saveDb };
