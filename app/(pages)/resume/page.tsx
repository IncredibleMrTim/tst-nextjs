'use client';

import PdfViewer from '@components/pdfViewer/PdfViewer';
import { useLottie } from 'lottie-react';
import * as animation from './rotating-phone.json';

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
      <div className="flex flex-col md:hidden">
        <p className="text-center  mt-4">
          The PDF viewer is not supported on mobile devices. Please view the
          resume on a desktop.
        </p>
        <div className="flex h-full mt-16">{View}</div>
      </div>
    </div>
  );
};

export default Resume;
