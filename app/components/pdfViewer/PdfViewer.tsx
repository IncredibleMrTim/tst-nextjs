'use client';

import { useState, useEffect } from 'react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { Viewer, DocumentLoadEvent } from '@react-pdf-viewer/core';
import PDFToolbar from './Toolbar';
import '@react-pdf-viewer/toolbar/lib/styles/index.css';
import '@react-pdf-viewer/core/lib/styles/index.css';

const PdfViewer = () => {
  const [numPages, setNumPages] = useState<number>(0);
  const {
    Toolbar,
    toolbarInstances,
    jumpToNextPage,
    jumpToPreviousPage,
    jumpToPage
  } = PDFToolbar();
  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowRight':
          jumpToNextPage();
          break;
        case 'ArrowLeft':
          jumpToPreviousPage();
          break;
        case 'ArrowUp':
          jumpToPage(0);
          break;
        case 'ArrowDown':
          jumpToPage(numPages - 1);
          break;
      }

      if (event.key === 'ArrowRight') {
        jumpToNextPage();
      } else if (event.key === 'ArrowLeft') {
        jumpToPreviousPage();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [numPages]);

  return (
    <div className="flex w-full flex-col h-full">
      <div className="flex flex-col border-1 border-gray-200 shadow-sm">
        <Toolbar />

        <div className="flex flex-row h-[55rem] gap-2 my-2 ">
          <Viewer
            plugins={[...toolbarInstances]}
            fileUrl="/TimSmartCV_10-06-25.pdf"
            onDocumentLoad={(e: DocumentLoadEvent) =>
              onDocumentLoadSuccess({ numPages: e.doc.numPages })
            }
          />
        </div>
      </div>
    </div>
  );
};

export default PdfViewer;
