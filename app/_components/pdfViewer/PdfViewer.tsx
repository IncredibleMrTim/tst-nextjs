'use client';

import { Button } from '@radix-ui/themes';
import { useState, useEffect } from 'react';
import { pdfjs } from 'react-pdf';
import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Set the workerSrc to the locally served worker file
pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

const PdfViewer = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState<number>(0);
  const [prevDisabled, setPrevDisabled] = useState(false);
  const [nextDisabled, setNextDisabled] = useState(true);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    console.log('t1');
    setNumPages(numPages);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        setPageNumber(prev => Math.min(prev + 1, numPages));
      } else if (event.key === 'ArrowLeft') {
        setPageNumber(prev => Math.max(prev - 1, 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [numPages]);

  useEffect(() => {
    console.log('pageNumber', pageNumber, 'numPages', numPages);

    setPrevDisabled(pageNumber === 1);
    setNextDisabled(pageNumber >= numPages);
  }, [pageNumber, numPages]);

  return (
    <div className=" mt-40 shadow-md p-4 border-1 border-gray-300 rounded-md overflow-y-scroll ">
      <div className="flex items-center w-full border-b-1 border-gray-300 py-4 justify-between">
        <div className="flex gap-2 pl-2">
          <Button
            variant="outline"
            disabled={prevDisabled}
            value="previous"
            onClick={() => setPageNumber(prev => Math.max(prev - 1, 1))}
          >
            Prev
          </Button>
          <Button
            disabled={nextDisabled}
            value="next"
            onClick={() => setPageNumber(prev => Math.min(prev + 1, numPages))}
          >
            Next
          </Button>
        </div>
        <div className="pr-2">
          Showing page {pageNumber}/{numPages}
        </div>
      </div>
      <Document
        file="/TimSmartCV_31-03-25.pdf"
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
    </div>
  );
};

export default PdfViewer;
