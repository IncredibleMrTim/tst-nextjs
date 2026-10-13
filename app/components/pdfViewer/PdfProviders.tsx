'use client';

import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { Worker } from '@react-pdf-viewer/core';

interface PdfProvidersProps {
  children: React.ReactNode;
}

/**
 * The PDF viewer's toolbar is built on Radix Themes, and the viewer needs the
 * pdf.js worker. Only the resume route needs either, so they live here and not in the root layout.
 */
const PdfProviders = ({ children }: PdfProvidersProps) => (
  <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
    <Theme appearance="light" hasBackground={false}>
      {children}
    </Theme>
  </Worker>
);

export default PdfProviders;
