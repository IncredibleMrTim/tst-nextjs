import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { defineLocations, presentationTool } from 'sanity/presentation';
import { structureTool } from 'sanity/structure';

import { codeInput } from '@sanity/code-input';
import { colorInput } from '@sanity/color-input';
import { StatusNavbar } from '@/sanity/components/StatusNavbar';
import { WideFormLayout } from '@/sanity/components/WideFormLayout';
import { apiVersion, dataset, projectId } from '@/sanity/env';
import { schema } from '@/sanity/schemaTypes';
import { structure } from '@/sanity/structure';
import { deploymentStatusTool } from '@/sanity/tools/DeploymentStatusTool';
import { sanityStatusTool } from '@/sanity/tools/SanityStatusTool';

export default defineConfig({
  basePath: '/admin',
  title: 'Tim Smart Technology Ltd.',
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({ structure }),
    // Live preview of the site inside Studio. The site is served from the same
    // origin, and draft mode is switched on through the route below.
    presentationTool({
      previewUrl: { previewMode: { enable: '/api/draft-mode/enable' } },
      resolve: {
        locations: {
          rolesSection: defineLocations({
            locations: [
              { title: 'Home', href: '/' },
              { title: 'Experience', href: '/experience' }
            ]
          })
        }
      }
    }),
    visionTool({ defaultApiVersion: apiVersion }),
    codeInput(),
    colorInput()
  ],
  tools: prev => [...prev, deploymentStatusTool(), sanityStatusTool()],
  studio: { components: { navbar: StatusNavbar, layout: WideFormLayout } },
  // Google as the primary sign-in, with Sanity's own email/password as a
  // fallback if Google is unavailable — drops GitHub/Vercel from the
  // default provider list. Only invited project members can actually sign
  // in either way (managed in manage.sanity.io), so this is about which
  // sign-in methods show up, not who's allowed in.
  auth: {
    providers: prev =>
      prev.filter(
        provider => provider.name === 'google' || provider.name === 'sanity'
      )
  }
});
