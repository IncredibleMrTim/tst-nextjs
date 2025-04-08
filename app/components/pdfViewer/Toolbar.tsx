'use client';
import {
  MagnifyingGlassMinusIcon,
  MagnifyingGlassPlusIcon,
  ArrowsPointingOutIcon,
  PrinterIcon
} from '@heroicons/react/20/solid';
import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';
import { Flex, Button } from '@radix-ui/themes';
import {
  RenderZoomInProps,
  RenderZoomOutProps,
  zoomPlugin
} from '@react-pdf-viewer/zoom';

import { toolbarPlugin } from '@react-pdf-viewer/toolbar';
import {
  pageNavigationPlugin,
  RenderCurrentPageLabelProps
} from '@react-pdf-viewer/page-navigation';
import {
  fullScreenPlugin,
  RenderEnterFullScreenProps
} from '@react-pdf-viewer/full-screen';
import { printPlugin, RenderPrintProps } from '@react-pdf-viewer/print';
import React, { ReactElement } from 'react';

const PDFToolbar = () => {
  const toolbarPluginInstance = toolbarPlugin();
  const pageNavigationPluginInstance = pageNavigationPlugin();
  const zoomPluginInstance = zoomPlugin();
  const fullScreenPluginInstance = fullScreenPlugin();
  const printPluginInstance = printPlugin();

  const { jumpToNextPage, jumpToPreviousPage, CurrentPageLabel } =
    pageNavigationPluginInstance;
  const { ZoomIn, ZoomOut } = zoomPluginInstance;
  const { EnterFullScreen } = fullScreenPluginInstance;
  const { Print } = printPluginInstance;

  const ToolbarContent = () => (
    <Flex className="gap-2 items-center py-4 " justify="between">
      <Flex className="w-1/3 gap-4">
        <>
          <Button
            variant="ghost"
            value="Previous Page"
            title="Previous Page"
            onClick={jumpToPreviousPage}
          >
            <ArrowLeftIcon className="h-5 w-5 text-black" />
          </Button>
          <CurrentPageLabel>
            {(props: RenderCurrentPageLabelProps) => (
              <div
                title={`Showing page ${props.currentPage + 1} of ${props.numberOfPages}`}
              >
                <div className="flex text-sm min-w-35 justify-center">
                  Showing page {props.currentPage + 1} of {props.numberOfPages}
                </div>
              </div>
            )}
          </CurrentPageLabel>
          <Button
            title="Next Page"
            variant="ghost"
            value="Next Page"
            onClick={() => jumpToNextPage()}
          >
            <ArrowRightIcon className="h-5 w-5 text-black" />
          </Button>
        </>
      </Flex>
      <Flex className="w-1/3 gap-4" justify="center">
        <ZoomOut>
          {(props: RenderZoomOutProps) => (
            <Button variant="ghost" onClick={() => props.onClick()}>
              <MagnifyingGlassMinusIcon className="h-5 w-5 text-black" />
            </Button>
          )}
        </ZoomOut>
        <ZoomIn>
          {(props: RenderZoomInProps) => (
            <Button variant="ghost" onClick={() => props.onClick()}>
              <MagnifyingGlassPlusIcon className="h-5 w-5 text-black" />
            </Button>
          )}
        </ZoomIn>
      </Flex>
      <Flex className="gap-4 w-1/3" justify="end">
        <EnterFullScreen>
          {(props: RenderEnterFullScreenProps) => (
            <Button onClick={() => props.onClick()} variant="ghost">
              <ArrowsPointingOutIcon className="h-5 w-5 text-black" />
            </Button>
          )}
        </EnterFullScreen>
        <Print>
          {(props: RenderPrintProps) => (
            <Button onClick={() => props.onClick()} variant="ghost">
              <PrinterIcon className="h-5 w-5 text-black" />
            </Button>
          )}
        </Print>
      </Flex>
    </Flex>
  );

  const toolbarInstances = [
    toolbarPluginInstance,
    pageNavigationPluginInstance,
    zoomPluginInstance,
    fullScreenPluginInstance,
    printPluginInstance
  ];

  return {
    Toolbar: ToolbarContent,
    toolbarInstances
  };
};

export default PDFToolbar;
