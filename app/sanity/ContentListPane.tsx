import { Box, Card, Stack, Text } from "@sanity/ui"
import { usePaneRouter, type UserComponent } from "sanity/structure"

export interface ContentListItem {
  id: string
  title: string
  schemaType: string
  description?: string
}

/**
 * Replaces Sanity's built-in list pane because stock list items can't show a
 * description line under the title.
 */
export const ContentListPane: UserComponent = ({ options }) => {
  const items = (options?.items ?? []) as ContentListItem[]
  const { ChildLink, routerPanesState } = usePaneRouter()
  const selectedDocumentId = routerPanesState[1]?.[0]?.id

  return (
    <Box padding={2}>
      <Stack gap={1}>
        {items.map((item) => (
          <Card
            key={item.id}
            as={ChildLink}
            childId={item.id}
            padding={3}
            radius={2}
            selected={selectedDocumentId === item.id}
            tone="default"
          >
            <Stack gap={2}>
              <Text weight="medium">{item.title}</Text>
              {item.description ? (
                <Text size={1} muted>
                  {item.description}
                </Text>
              ) : null}
            </Stack>
          </Card>
        ))}
      </Stack>
    </Box>
  )
}
