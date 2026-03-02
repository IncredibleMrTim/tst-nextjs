import { prisma } from '@/lib/prisma';
import { Experience } from '@/api/experienceApi';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const experiencesData = await prisma.experience.findMany({
      orderBy: {
        order: 'asc'
      },
      include: {
        skills: {
          include: {
            skill: true
          },
          orderBy: {
            order: 'asc'
          }
        }
      }
    });

    // Transform to match the API response format
    const transformedData = experiencesData.map((exp) => ({
      role: exp.role,
      company: exp.company,
      order: exp.order,
      location: exp.location,
      fromDate: exp.fromDate,
      toDate: exp.toDate,
      description: exp.description,
      skills: exp.skills.map((es) => ({
        order: es.order,
        name: es.skill.name,
      })),
    }));

    const data: Experience[] = transformedData;

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching experience:', error);
    return NextResponse.json(
      { error: 'Failed to fetch experience' },
      { status: 500 }
    );
  }
}
