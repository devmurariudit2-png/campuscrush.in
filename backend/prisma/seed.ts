/// <reference types="node" />
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Users
  const user1 = await prisma.user.upsert({
    where: { email: 'priya@pdeu.ac.in' },
    update: {},
    create: {
      id: '1',
      email: 'priya@pdeu.ac.in',
      display_name: 'Priya',
      age: 21,
      college: 'PDEU',
      department: 'ICT',
      coins: 120,
      photos: {
        create: [
          { url: 'https://picsum.photos/400/600?random=1', caption: 'Sunset at the canteen' },
          { url: 'https://picsum.photos/400/600?random=2', caption: 'Lab days are long days' },
        ],
      },
      prompts: {
        create: [
          { question: '3AM canteen or sunrise run?', answer: 'Canteen. Always canteen.' },
        ],
      },
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'rahul@daiict.ac.in' },
    update: {},
    create: {
      id: '2',
      email: 'rahul@daiict.ac.in',
      display_name: 'Rahul',
      age: 22,
      college: 'DAIICT',
      department: 'M.Tech',
      coins: 50,
      photos: {
        create: [
          { url: 'https://picsum.photos/400/600?random=4' },
        ],
      },
      prompts: {
        create: [
          { question: 'My GPA vs my vibe:', answer: 'Vibe is 10/10, GPA is... a secret.' },
        ],
      },
    },
  });

  // Events
  await prisma.event.upsert({
    where: { id: '1' },
    update: {},
    create: {
      id: '1',
      title: 'Midnight Canteen Meetup',
      description: 'The legendary ICT canteen is open late tonight. Free chai for the first 10 people.',
      location: 'PDEU Canteen',
      date: 'May 15, 23:00',
      category: 'Social',
      college: 'PDEU',
      attendees: 120,
      crushUsers: 42,
      rsvps: 42,
      image: 'https://picsum.photos/600/300?random=33',
    },
  });

  await prisma.event.upsert({
    where: { id: '2' },
    update: {},
    create: {
      id: '2',
      title: 'Synapse 2026 Intro',
      description: 'Kickoff for DAIICT cultural fest.',
      location: 'OAT, DAIICT',
      date: 'May 20, 18:00',
      category: 'Fest',
      college: 'DAIICT',
      attendees: 300,
      crushUsers: 156,
      rsvps: 156,
      image: 'https://picsum.photos/600/300?random=34',
    },
  });

  console.log('Seeding complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
