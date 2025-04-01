'use client';

import PdfViewer from '@components/pdfViewer/PdfViewer';
import { useLottie } from 'lottie-react';
import * as animation from './rotating-phone.json';
import Link from 'next/link';
import { Button } from '@radix-ui/themes';

const Resume = () => {
  const { View } = useLottie({
    animationData: animation,
    loop: true,
    autoplay: true
  });

  return (
    <div className="flex justify-center items-center">
      <div className="hidden md:flex">
        <PdfViewer />
      </div>
      <div className="flex flex-col md:hidden items-center gap-4">
        <p className="text-center">
          The PDF viewer is not supported in this view. Please rotate your
          device, download the the file or use a desktop to view.
        </p>
        <Link
          href="/TimSmartCV_31-03-25.pdf"
          target="_blank"
          aria-label="Download resume"
          aria-controls="Download resume button"
        >
          <Button variant="outline" size="3" aria-ignore>
            Download Resume/CV
          </Button>
        </Link>
        <div>{View}</div>
      </div>
    </div>
  );
};

export default Resume;
