'use client';

import PdfViewer from '@/components/pdfViewer/PdfViewer';
import Link from 'next/link';
import Image from 'next/image';
import { Button, Flex } from '@radix-ui/themes';

const Resume = () => {
  return (
    <div className="flex justify-center">
      <div className="flex w-full hidden portrate:hidden landscape:flex">
        <PdfViewer />
      </div>
      <div className="flex flex-col items-center gap-20 portrate:flex landscape:hidden">
        <p className="text-center">
          The PDF viewer is not supported in this view. Please rotate your
          device, download the file or use a desktop browser to view.
        </p>
        <div className="!w-1/3 landscape:w-1/3">
          <Image
            src="/rotate-phone.png"
            alt="Rotating phone animation"
            width={150}
            height={150}
            quality={10}
          />
        </div>
        <Link
          prefetch
          href="/TimSmartCV_10-06-25.pdf"
          target="_blank"
          aria-label="Download resume"
          aria-controls="Download resume button"
        >
          <Button variant="outline" size="3" aria-hidden>
            Download Resume/CV
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Resume;
