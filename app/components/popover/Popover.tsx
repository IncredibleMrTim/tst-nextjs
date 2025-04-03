import { Button, Popover } from '@radix-ui/themes';

export default ({
  targetElement,
  closeElement,
  children
}: {
  targetElement: React.ReactNode;
  closeElement?: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <Popover.Root>
      <Popover.Trigger>{targetElement}</Popover.Trigger>
      <Popover.Content align="end">
        {children}
        {closeElement && <Popover.Close>{closeElement}</Popover.Close>}
      </Popover.Content>
    </Popover.Root>
  );
};
