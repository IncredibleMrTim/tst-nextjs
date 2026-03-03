import prisma from '../app/lib/prisma.js';
import { skillsData } from './seedData.js';
import { experienceData } from './experienceSeedData.js';

async function main() {
  console.log('🌱 Starting to seed database...');

  // Clear existing data
  console.log('🗑️  Clearing existing data...');
  await prisma.experienceSkill.deleteMany();
  await prisma.experience.deleteMany();
  await prisma.skill.deleteMany();

  // Seed skills
  console.log(`\n📝 Seeding ${skillsData.length} skills...`);
  const createdSkills = await prisma.skill.createMany({
    data: skillsData
  });
  console.log(`✅ Created ${createdSkills.count} skills`);

  // Seed experiences with skills
  console.log(`\n📝 Seeding ${experienceData.length} experiences...`);
  for (const expData of experienceData) {
    console.log(
      `\n  Creating: ${expData.role} at ${expData.company} (${expData.skills.length} skills)`
    );

    try {
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
      console.log(`    ✅ Experience created (ID: ${experience.id})`);

      // Link skills to the experience
      let skillsAdded = 0;
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
          console.log(`      ✅ ${skillData.name}`);
          skillsAdded++;
        } else {
          console.log(`      ⚠️  "${skillData.name}" not found`);
        }
      }
      console.log(`  ✅ Added ${skillsAdded}/${expData.skills.length} skills`);
    } catch (error) {
      console.error(`  ❌ Error creating experience:`, error);
    }
  }

  console.log('\n🎉 Seeding completed successfully!');
  console.log(`✅ Created ${createdSkills.count} skills`);
  console.log(`✅ Created ${experienceData.length} experience(s)`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
