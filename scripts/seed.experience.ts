import prisma from '../app/lib/prisma.js';
import { experienceData } from './experienceSeedData.js';

async function main() {
  console.log('🌱 Starting to seed experience data...');

  // Clear existing data
  console.log('🗑️  Clearing existing experience data...');
  await prisma.experienceSkill.deleteMany();
  await prisma.experience.deleteMany();

  // Seed experiences with skills
  for (const expData of experienceData) {
    console.log(
      `📝 Creating experience: ${expData.role} at ${expData.company}...`
    );

    // Create the experience record
    const experience = await prisma.experience.create({
      data: {
        role: expData.role,
        company: expData.company,
        location: expData.location,
        description: expData.description,
        fromDate: expData.fromDate,
        toDate: expData.toDate,
        order: expData.order
      }
    });

    // Link skills to the experience
    for (const skillData of expData.skills) {
      // Find the skill by name
      const skill = await prisma.skill.findFirst({
        where: { name: skillData.name }
      });

      if (skill) {
        // Create the junction record
        await prisma.experienceSkill.create({
          data: {
            experienceId: experience.id,
            skillId: skill.id,
            order: skillData.order
          }
        });
        console.log(`  ✅ Added skill: ${skill.name}`);
      } else {
        console.log(
          `  ⚠️  Skill "${skillData.name}" not found in database (skipped)`
        );
      }
    }

    console.log(`✅ Created experience with ${expData.skills.length} skills\n`);
  }

  console.log('🎉 Experience seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding experience data:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
