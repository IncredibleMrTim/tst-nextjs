import { Flex, Grid, Stack, Switch, Text } from '@sanity/ui';
import {
  ObjectInputMember,
  set,
  type ObjectInputProps,
  type ObjectMember
} from 'sanity';

/**
 * Role object input that lays out the dates fieldset in a grid and hides
 * "To Date" while the role is current. Everything outside the dates fieldset
 * is rendered by Sanity as normal.
 *
 * This lives on the role object rather than the fieldset because a fieldset
 * is only a grouping hint and can't take a component.
 */
export function RoleDatesInput(props: ObjectInputProps) {
  const { members, renderInput, renderField, renderItem, renderPreview } =
    props;
  const value = props.value as { rolePresent?: boolean } | undefined;
  const isPresent = Boolean(value?.rolePresent);

  // Sanity wraps its own boolean input in a bordered card, so Present is
  // drawn here to sit borderless alongside the date inputs.
  // Switch renders no text of its own, so the label is a real <label>. The id
  // is per role because several roles can be open at once.
  const renderPresentSwitch = (member: ObjectMember) => {
    const switchId = `role-present-${member.key}`;

    return (
      // The outer Flex fills the grid cell (field header + input) and pins
      // the row to the bottom, level with the date inputs. The inner row
      // matches the input height so the switch and label centre on it.
      <Flex key={member.key} align="flex-end">
        <Flex align="center" gap={2} style={{ minHeight: 36 }}>
          <Switch
            id={switchId}
            checked={isPresent}
            readOnly={props.readOnly}
            onChange={event =>
              props.onChange(set(event.currentTarget.checked, ['rolePresent']))
            }
          />
          <Text as="label" htmlFor={switchId} size={1}>
            Present
          </Text>
        </Flex>
      </Flex>
    );
  };

  const renderMember = (member: ObjectMember) => (
    <ObjectInputMember
      key={member.key}
      member={member}
      renderInput={renderInput}
      renderField={renderField}
      renderItem={renderItem}
      renderPreview={renderPreview}
    />
  );

  return (
    <Stack gap={4}>
      {members.map(member => {
        const isDatesFieldset =
          member.kind === 'fieldSet' && member.fieldSet.name === 'dates';
        if (!isDatesFieldset) return renderMember(member);

        return (
          <Stack key={member.key} gap={3}>
            <Text size={1} weight="semibold">
              Role Start/End Dates
            </Text>
            <Grid gridTemplateColumns={[1, 3]} gap={4}>
              {member.fieldSet.members
                .filter(
                  dateMember =>
                    !(
                      isPresent &&
                      dateMember.kind === 'field' &&
                      dateMember.name === 'roleTo'
                    )
                )
                .map(dateMember =>
                  dateMember.kind === 'field' &&
                  dateMember.name === 'rolePresent'
                    ? renderPresentSwitch(dateMember)
                    : renderMember(dateMember)
                )}
            </Grid>
          </Stack>
        );
      })}
    </Stack>
  );
}
