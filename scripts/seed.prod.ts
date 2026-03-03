import prisma from '../app/lib/prisma.js';
import { skillsData } from './seedData.js';

async function main() {
  console.log('🌱 Starting to seed production database...');

  // Check if any skills exist
  const existingSkillsCount = await prisma.skill.count();

  if (existingSkillsCount > 0) {
    console.log(`ℹ️  Database already contains ${existingSkillsCount} skills. Skipping seeding...`);
    return;
  }

  // Seed skills
  console.log(`📝 Seeding ${skillsData.length} skills...`);
  const createdSkills = await prisma.skill.createMany({
    data: skillsData
  });

  console.log('🎉 Production seeding completed successfully!');
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
