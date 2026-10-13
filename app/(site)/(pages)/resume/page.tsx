export const revalidate = 2592000; // 30 days

import Image from 'next/image';

import PdfProviders from '@/components/pdfViewer/PdfProviders';
import PdfViewer from '@/components/pdfViewer/PdfViewer';
import { Button } from '@/components/ui/button';
import { CV_URL } from '@/lib/navigation';

const Resume = () => {
  return (
    <div className="flex justify-center">
      <div className="hidden w-full overflow-hidden rounded-tile bg-white landscape:flex">
        <PdfProviders>
          <PdfViewer />
        </PdfProviders>
      </div>
      <div className="flex flex-col items-center gap-20 landscape:hidden">
        <p className="text-center">
          The PDF viewer is not supported in this view. Please rotate your
          device, download the file or use a desktop browser to view.
        </p>
        <div className="w-1/3">
          <Image
            src="/rotate-phone.png"
            alt="Rotating phone animation"
            width={150}
            height={150}
            quality={10}
          />
        </div>
        <Button asChild variant="brand" size="pill">
          <a
            href={CV_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download resume"
          >
            Download Resume/CV
          </a>
        </Button>
      </div>
    </div>
  );
};

export default Resume;
