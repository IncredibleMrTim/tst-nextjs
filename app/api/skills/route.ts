import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Skill, SkillCategories } from '@/api/skillsApi';

export async function GET() {
  try {
    const skillCategoriesData = await prisma.skillCategory.findMany({
      orderBy: {
        order: 'asc'
      },
      include: {
        skills: {
          orderBy: {
            order: 'asc'
          }
        }
      }
    });

    // Transform to match the API response format
    const transformedData = skillCategoriesData.map(category => ({
      title: category.title,
      skills: category.skills.map(skill => ({
        name: skill.name,
        description: skill.description
      }))
    }));

    const data: SkillCategories = transformedData;

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching skills:', error);
    return NextResponse.json(
      { error: 'Failed to fetch skills' },
      { status: 500 }
    );
  }
}
