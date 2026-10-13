'use client';

import { ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';

interface AboutDialogProps {
  name: string;
  paragraphs: string[];
}

const AboutDialog = ({ name, paragraphs }: AboutDialogProps) => {
  const [firstName] = name.split(' ');

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="underline" size="text">
          Read the full profile <ArrowRight />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] max-w-[40rem] gap-0 overflow-y-auto rounded-3xl border-line-strong bg-surface p-[1.8rem] sm:rounded-3xl">
        <DialogTitle className="mb-4 text-[1.6rem] font-bold">
          About {firstName}
        </DialogTitle>
        <DialogDescription className="sr-only">
          The full profile for {name}
        </DialogDescription>
        {paragraphs.map(paragraph => (
          <p
            key={paragraph}
            className="mb-4 text-[0.97rem] text-muted-foreground"
          >
            {paragraph}
          </p>
        ))}
      </DialogContent>
    </Dialog>
  );
};

export default AboutDialog;
