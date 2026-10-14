import { Flex, Text } from '@sanity/ui';
import type { PreviewProps } from 'sanity';

interface RolePreviewProps extends PreviewProps {
  // Extra value returned by the role's `prepare`; Sanity spreads it into the
  // preview props alongside title and subtitle.
  dateRange?: string;
}

/**
 * Array-list preview for a role: company and title on the left as usual, with
 * the date range pushed to the right edge. The default preview only has
 * title/subtitle/description slots, so the right-hand text needs its own
 * layout around it.
 */
export function RolePreview(props: RolePreviewProps) {
  const { dateRange, ...defaultProps } = props;

  return (
    <Flex align="center" gap={3}>
      <div style={{ flex: 1, minWidth: 0 }}>
        {props.renderDefault(defaultProps)}
      </div>
      {dateRange && (
        <Text size={1} muted style={{ whiteSpace: 'nowrap' }}>
          {dateRange}
        </Text>
      )}
    </Flex>
  );
}
