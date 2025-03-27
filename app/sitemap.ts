import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://www.timsmarttechnology.co.uk/',
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 1
    },
    {
      url: 'https://www.timsmarttechnology.co.uk/experience',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: 'https://www.timsmarttechnology.co.uk/skills',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5
    }
  ];
}
