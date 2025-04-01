'use client';

import PdfViewer from '@components/pdfViewer/PdfViewer';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@radix-ui/themes';

const Resume = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="hidden md:flex">
        <PdfViewer />
      </div>
      <div className="flex flex-col items-center gap-20 md:hidden">
        <p className="text-center">
          The PDF viewer is not supported in this view. Please rotate your
          device, download the the file or use a desktop to view.
        </p>
        <Image
          src="/rotate-phone.png"
          alt="Rotating phone animation"
          width={150}
          height={150}
          quality={10}
        />
        <Link
          href="/TimSmartCV_31-03-25.pdf"
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
