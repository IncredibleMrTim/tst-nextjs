'use client';

import { Box, Button, Flex, Link } from '@radix-ui/themes';
import { useState, useEffect, ReactElement } from 'react';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/20/solid';

import {
  Viewer,
  PageChangeEvent,
  DocumentLoadEvent
} from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { toolbarPlugin } from '@react-pdf-viewer/toolbar';
import {
  pageNavigationPlugin,
  RenderCurrentPageLabelProps
} from '@react-pdf-viewer/page-navigation';
import '@react-pdf-viewer/toolbar/lib/styles/index.css';
import { Toolbar } from 'radix-ui';

// Set the workerSrc to the locally served worker file

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

  const toolbarPluginInstance = toolbarPlugin();
  const { Toolbar } = toolbarPluginInstance;

  const pageNavigationPluginInstance = pageNavigationPlugin();
  const { jumpToNextPage, jumpToPreviousPage, CurrentPageLabel } =
    pageNavigationPluginInstance;

    const renderNavigation = () => (
      <CurrentPageLabel>
        {(props: RenderCurrentPageLabelProps) => (
          <Flex className="gap-2 pr-2 items-center py-4">
            <Button
              variant="ghost"
              value="Previous Page"
              title="Previous Page"
              onClick={() => jumpToPreviousPage()}
            >
              <ArrowLeftIcon className="h-5 w-5" />
            </Button>
            <div
              title={`Showing page ${props.currentPage + 1} of ${props.numberOfPages}`}
            >
              <div className="flex text-sm min-w-35 justify-center">
                Showing page {props.currentPage + 1} of {props.numberOfPages}
              </div>
            </div>
            <Button
              title="Next Page"
              variant="ghost"
              value="Next Page"
              onClick={() => jumpToNextPage()}
            >
              <ArrowRightIcon className="h-5 w-5" />
            </Button>
          </Flex>
        )}
      </CurrentPageLabel>
    );

  const renderToolbar = () => {
    return (
      <div className="flex items-center w-full justify-between">
        <div>{renderNavigation()}</div>
      </div>
    );
  };

  return (
    <div>
      <div className="mt-8">{renderToolbar()}</div>

      <div className="flex w-[64rem] !h-[50rem]">
        <Viewer
          onPageChange={(e: PageChangeEvent) => setPageNumber(e.currentPage)}
          plugins={[toolbarPluginInstance, pageNavigationPluginInstance]} // Ensure this matches the declared instance
          fileUrl="/TimSmartCV_07-04-25.pdf"
          onDocumentLoad={(e: DocumentLoadEvent) =>
            onDocumentLoadSuccess({ numPages: e.doc.numPages })
          }
        />
      </div>
    </div>

  );
};

export default PdfViewer;
