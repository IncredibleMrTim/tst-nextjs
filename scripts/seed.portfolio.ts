import prisma from '../app/lib/prisma.js';
import {
  educationData,
  experienceData,
  featuredWorkData,
  profileData,
  projectData,
  skillGroupData
} from './portfolioSeedData.js';

const PROFILE_ID = 'profile';

/**
 * Roles are matched on their start date rather than replaced, so any existing
 * `description` text and ids survive a re-run. Nothing here deletes an experience.
 */
const seedExperiences = async () => {
  for (const experience of experienceData) {
    const existing = await prisma.experience.findFirst({
      where: { fromDate: experience.fromDate }
    });

    if (existing) {
      await prisma.experience.update({
        where: { id: existing.id },
        data: experience
      });
    } else {
      await prisma.experience.create({ data: experience });
    }
  }
  console.log(`✅ Synced ${experienceData.length} experiences`);
};

const seedFeaturedWork = async () => {
  await prisma.featuredWork.deleteMany();

  for (const { company, ...featuredWork } of featuredWorkData) {
    const experience = await prisma.experience.findFirst({
      where: { company }
    });

    if (!experience) {
      console.warn(`⚠️  No experience found for "${company}", skipping`);
      continue;
    }

    await prisma.featuredWork.create({
      data: { ...featuredWork, experienceId: experience.id }
    });
  }
  console.log(`✅ Created ${featuredWorkData.length} featured work items`);
};

async function main() {
  console.log('🌱 Starting to seed portfolio content...');

  await seedExperiences();
  await seedFeaturedWork();

  await prisma.project.deleteMany();
  await prisma.project.createMany({ data: projectData });
  console.log(`✅ Created ${projectData.length} projects`);

  await prisma.education.deleteMany();
  await prisma.education.createMany({ data: educationData });
  console.log(`✅ Created ${educationData.length} education entries`);

  await prisma.skillGroup.deleteMany();
  await prisma.skillGroup.createMany({ data: skillGroupData });
  console.log(`✅ Created ${skillGroupData.length} skill groups`);

  await prisma.profile.upsert({
    where: { id: PROFILE_ID },
    create: { id: PROFILE_ID, ...profileData },
    update: profileData
  });
  console.log('✅ Synced profile');

  console.log('🎉 Portfolio seeding completed successfully!');
}

main()
  .catch(e => {
    console.error('❌ Error seeding portfolio:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
