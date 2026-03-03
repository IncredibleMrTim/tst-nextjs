import prisma from '../app/lib/prisma.js';
import { skillsData } from './seedData.js';

async function main() {
  console.log('🌱 Starting to seed database...');

  // Clear existing data
  console.log('🗑️  Clearing existing data...');
  await prisma.skill.deleteMany();

  // Seed skills
  console.log(`📝 Seeding ${skillsData.length} skills...`);
  const createdSkills = await prisma.skill.createMany({
    data: skillsData
  });

  console.log('🎉 Seeding completed successfully!');
  console.log(`✅ Created ${createdSkills.count} skills`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
