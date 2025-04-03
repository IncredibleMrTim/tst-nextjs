'use client';

import { Button, Link } from '@radix-ui/themes';
import { useState, useEffect } from 'react';
import { pdfjs } from 'react-pdf';
import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import {
  ArrowsPointingOutIcon,
  ArrowLeftIcon,
  ArrowRightIcon
} from '@heroicons/react/20/solid';

import { Toolbar } from 'radix-ui';
// Set the workerSrc to the locally served worker file
pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

const PdfViewer = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState<number>(0);
  const [prevDisabled, setPrevDisabled] = useState(false);
  const [nextDisabled, setNextDisabled] = useState(true);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
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
    setPrevDisabled(pageNumber === 1);
    setNextDisabled(pageNumber >= numPages);
  }, [pageNumber, numPages]);

  return (
    <div className="mt-8 border-gray-200 rounded-sm border-1">
      <Toolbar.Root className="flex w-full p-2 rounded-sm bg-gradient-to-b from-gray-100 to-80% to-white ">
        <div className="flex items-center w-full justify-between">
          <Toolbar.ToggleGroup type="multiple" area-label="PDF Viewer">
            <div className="flex gap-2 pr-2 items-center">
              <Toolbar.Button
                value="Previous Page"
                disabled={prevDisabled}
                className={prevDisabled ? 'opacity-50 cursor-not-allowed' : ''}
                title="Previous Page"
              >
                <ArrowLeftIcon
                  className="h-5 w-5"
                  onClick={() => setPageNumber(prev => Math.max(prev - 1, 1))}
                />
              </Toolbar.Button>
              <Toolbar.ToggleItem
                value="Page number"
                title={`Showing page ${pageNumber} of ${numPages}`}
              >
                <div className="flex text-sm min-w-35 justify-center">
                  Showing page {pageNumber} of {numPages}
                </div>
              </Toolbar.ToggleItem>

              <Toolbar.Button
                title="Next Page"
                disabled={nextDisabled}
                value="Next Page"
                className={nextDisabled ? 'opacity-50 cursor-not-allowed' : ''}
              >
                <ArrowRightIcon
                  className="h-5 w-5"
                  onClick={() =>
                    setPageNumber(prev => Math.min(prev + 1, numPages))
                  }
                />
              </Toolbar.Button>
            </div>
          </Toolbar.ToggleGroup>

          <Toolbar.ToggleGroup type="multiple" area-label="PDF Viewer">
            <div className="flex gap-2 pr-2">
              <Toolbar.Button>
                <Link
                  href="/TimSmartCV_31-03-25.pdf"
                  target="_blank"
                  title="Open resume in new tab"
                  aria-label="Open resume in new tab"
                >
                  <ArrowsPointingOutIcon className="h-5 w-5 text-gray-500" />
                </Link>
              </Toolbar.Button>
            </div>
          </Toolbar.ToggleGroup>
        </div>
      </Toolbar.Root>
      {/* <div className="flex gap-2 pl-2">
          <Button
            variant="outline"
            size="1"
            disabled={prevDisabled}
            value="previous"
            onClick={() => setPageNumber(prev => Math.max(prev - 1, 1))}
          >
            Prev
          </Button>
          <Button
            disabled={nextDisabled}
            size="1"
            value="next"
            onClick={() => setPageNumber(prev => Math.min(prev + 1, numPages))}
          >
            Next
          </Button>
          <div className="flex pr-2 text-sm items-center">
            Showing page {pageNumber}/{numPages}
          </div>
        </div>
        <div className="flex gap-10 pr-2">
          <Link
            href="/TimSmartCV_31-03-25.pdf"
            target="_blank"
            className="border-r-1 border-gray-300 pr-2"
          >
            <Button variant="ghost" size="2" title="Open in new tab">
              <ArrowsPointingOutIcon className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="/TimSmartCV_31-03-25.pdf" target="_blank">
            <Button variant="ghost" size="2" title="Open in new tab">
              <ArrowsPointingOutIcon className="h-5 w-5" />
            </Button>
          </Link>
        </div>*/}
      <div className="!h-[60vh] overflow-y-scroll">
        <Document
          file="/TimSmartCV_31-03-25.pdf"
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} />
        </Document>
      </div>
    </div>
  );
};

export default PdfViewer;
