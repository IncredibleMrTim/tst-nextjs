import {
  defineArrayMember,
  defineField,
  type BlockAnnotationProps,
  type BlockDecoratorProps,
  type BlockProps
} from 'sanity';
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Italic,
  Link as LinkIcon,
  Palette,
  Smile,
  Strikethrough,
  Underline
} from 'lucide-react';
import {
  renderAnnotationMark,
  renderDecoratorMark
} from '@/components/portableText/marks';
import { BLOCK_STYLES } from '@/sanity/schemaTypes/blockStyles';
import { ICON_SIZES, InlineIcon } from '@/components/portableText/InlineIcon';
import { LucideIconInput } from '@/sanity/schemaTypes/helpers/LucideIconInput';
import { BrandSwatchColorInput } from '@/sanity/schemaTypes/helpers/BrandSwatchColorInput';

function decoratorComponent(props: BlockDecoratorProps) {
  return <>{renderDecoratorMark(props.value, props.children)}</>;
}

/**
 * Sanity renders its own floating editor (`PopoverEditDialog`) for any
 * annotation object automatically — confirmed live: it appears both on
 * fresh insertion and on reopening an existing annotation, with zero
 * involvement from this component. An earlier version of this component
 * also rendered `props.children` (the edit form) in a custom `Dialog`,
 * which just duplicated Sanity's own popover — two floating editors open
 * at once. So this only renders the always-visible styled text
 * (`textElement`); editing is left entirely to Sanity's built-in popover.
 */
function annotationComponent(props: BlockAnnotationProps) {
  return (
    <>
      {renderAnnotationMark(
        props.schemaType.name,
        props.value,
        props.textElement
      )}
    </>
  );
}

/** Matches `IMAGE_SIZE_CLASSES` in `components/portableText/marks.tsx` so the
 * Studio canvas previews an image block at roughly the width it renders on
 * the live site. */
const IMAGE_EDITOR_WIDTH: Record<string, string> = {
  small: '33%',
  medium: '66%',
  large: '100%'
};

/** Matches `IMAGE_ALIGNMENT_CLASSES` in `components/portableText/marks.tsx`. */
const IMAGE_EDITOR_MARGIN: Record<string, string> = {
  left: '0 auto 0 0',
  center: '0 auto',
  right: '0 0 0 auto'
};

interface LucideIconValue {
  name?: string;
  iconNode?: string;
  swatch?: { hex?: string };
  size?: string;
}

/**
 * Draws the chosen icon inside the editor text, so editors see the icon (and
 * its color) rather than a generic inline-object chip. Only the preview is
 * swapped: `renderDefault` keeps Sanity's own inline wrapper, which opens the
 * Edit / Delete popover on click and the edit dialog beyond that.
 */
function lucideIconInlineComponent(props: BlockProps) {
  const value = props.value as LucideIconValue | undefined;

  return props.renderDefault({
    ...props,
    renderPreview: () => (
      <span title={value?.name} style={{ display: 'inline-flex' }}>
        {value?.iconNode ? (
          <InlineIcon
            iconNode={value.iconNode}
            hex={value.swatch?.hex}
            size={value.size}
          />
        ) : (
          'Icon?'
        )}
      </span>
    )
  });
}

function imageBlockPreviewComponent(props: BlockProps) {
  const value = props.value as
    | {
        size?: string;
        alignment?: string;
        customDimensions?: {
          width?: number;
          height?: number;
          unit?: 'px' | '%';
        };
      }
    | undefined;
  // Matches `PortableTextImage` in `components/portableText/marks.tsx`:
  // custom dimensions are an explicit width/height override, not another
  // size preset, so they take precedence over `size` here too.
  const {
    width: customWidth,
    height: customHeight,
    unit = 'px'
  } = value?.customDimensions ?? {};
  const width =
    customWidth && customHeight
      ? `${customWidth}${unit}`
      : IMAGE_EDITOR_WIDTH[value?.size ?? 'large'];
  const margin = IMAGE_EDITOR_MARGIN[value?.alignment ?? 'center'];
  return <div style={{ width, margin }}>{props.renderDefault(props)}</div>;
}

/**
 * Shared by the Text Color annotation and the inline icon so both pick from
 * the same brand palette.
 */
const brandSwatchField = () =>
  defineField({
    name: 'swatch',
    type: 'color',
    title: 'Color',
    // Brand tokens from `src/app/globals.css`'s `:root`, so
    // editors pick from the same palette the rest of the site
    // uses instead of an arbitrary freehand color. The labeled
    // swatch buttons below the picker (`BrandSwatchColorInput`)
    // select from the same list with one click.
    options: {
      colorList: [
        '#af7c3c', // --accent
        '#ece9e4', // --foreground
        '#6b6460', // --muted-foreground
        '#e5484d' // --destructive
      ]
    },
    components: { input: BrandSwatchColorInput }
  });

type TPortableTextSchema = {
  name?: string;
  title?: string;
  group?: string;
  description?: string;
};

export const portableTextSchema = ({
  name,
  title,
  description,
  group
}: TPortableTextSchema = {}) =>
  defineField({
    name: name ?? 'portableText',
    title: title ?? 'Portable Text Editor',
    description,
    group,
    type: 'array',
    of: [
      defineArrayMember({
        name: 'block',
        type: 'block',
        styles: BLOCK_STYLES,
        // Inline objects sit within a line of text, unlike the block-level
        // image member below, which takes up its own row.
        of: [
          defineArrayMember({
            name: 'lucideIcon',
            type: 'object',
            title: 'Icon',
            icon: Smile,
            components: {
              input: LucideIconInput,
              inlineBlock: lucideIconInlineComponent
            },
            // Both values are set together by the picker, never typed.
            fields: [
              defineField({ name: 'name', type: 'string', hidden: true }),
              defineField({ name: 'iconNode', type: 'string', hidden: true }),
              brandSwatchField(),
              defineField({
                name: 'size',
                title: 'Size',
                description: 'Relative to the surrounding text.',
                type: 'string',
                options: {
                  list: Object.entries(ICON_SIZES).map(
                    ([value, { title }]) => ({
                      title,
                      value
                    })
                  ),
                  layout: 'radio'
                },
                initialValue: 'default'
              })
            ],
            validation: Rule =>
              Rule.custom(value =>
                (value as { name?: string } | undefined)?.name
                  ? true
                  : 'Pick an icon.'
              ),
            preview: {
              select: { name: 'name', iconNode: 'iconNode', hex: 'swatch.hex' },
              prepare({ name, iconNode, hex }) {
                return {
                  title: name ?? 'Choose an icon',
                  media: iconNode ? (
                    <InlineIcon iconNode={iconNode} hex={hex} />
                  ) : undefined
                };
              }
            }
          })
        ],
        marks: {
          decorators: [
            {
              title: 'Strong',
              value: 'strong',
              icon: Bold,
              component: decoratorComponent
            },
            {
              title: 'Italic',
              value: 'em',
              icon: Italic,
              component: decoratorComponent
            },
            {
              title: 'Code',
              value: 'code',
              icon: Code,
              component: decoratorComponent
            },
            {
              title: 'Underline',
              value: 'underline',
              icon: Underline,
              component: decoratorComponent
            },
            {
              title: 'Strike',
              value: 'strike-through',
              icon: Strikethrough,
              component: decoratorComponent
            },
            {
              title: 'Small',
              value: 'small',
              icon: () => 'S',
              component: decoratorComponent
            },
            {
              title: 'Medium',
              value: 'medium',
              icon: () => 'M',
              component: decoratorComponent
            },
            {
              title: 'Large',
              value: 'large',
              icon: () => 'L',
              component: decoratorComponent
            },
            {
              title: 'Accent',
              value: 'accent',
              icon: () => 'A',
              component: decoratorComponent
            },
            {
              title: 'Heading 1',
              value: 'heading1',
              icon: Heading1,
              component: decoratorComponent
            },
            {
              title: 'Heading 2',
              value: 'heading2',
              icon: Heading2,
              component: decoratorComponent
            },
            {
              title: 'Heading 3',
              value: 'heading3',
              icon: Heading3,
              component: decoratorComponent
            },
            {
              title: 'Heading 4',
              value: 'heading4',
              icon: Heading4,
              component: decoratorComponent
            },
            {
              title: 'Align Left',
              value: 'align-left',
              icon: AlignLeft,
              component: decoratorComponent
            },
            {
              title: 'Align Center',
              value: 'align-center',
              icon: AlignCenter,
              component: decoratorComponent
            },
            {
              title: 'Align Right',
              value: 'align-right',
              icon: AlignRight,
              component: decoratorComponent
            }
          ],
          annotations: [
            defineArrayMember({
              name: 'link',
              type: 'object',
              title: 'Link',
              icon: LinkIcon,
              components: { annotation: annotationComponent },
              fields: [
                defineField({
                  name: 'href',
                  type: 'url',
                  title: 'Link',
                  description: 'A valid web, email, phone, or relative link.',
                  validation: Rule =>
                    Rule.uri({
                      scheme: ['http', 'https', 'tel', 'mailto'],
                      allowRelative: true
                    })
                })
              ]
            }),
            defineArrayMember({
              name: 'color',
              type: 'object',
              title: 'Text Color',
              icon: Palette,
              components: { annotation: annotationComponent },
              fields: [brandSwatchField()]
            })
          ]
        }
      }),
      defineArrayMember({
        name: 'image',
        type: 'image',
        options: { hotspot: true },
        components: { block: imageBlockPreviewComponent },
        preview: {
          select: {
            media: 'asset',
            size: 'size',
            width: 'customDimensions.width',
            height: 'customDimensions.height',
            unit: 'customDimensions.unit'
          },
          prepare({ media, size, width, height, unit }) {
            const u = unit ?? 'px';
            return {
              media,
              title:
                width && height
                  ? `${width}${u} × ${height}${u}`
                  : (size ?? 'large')
            };
          }
        },
        fields: [
          defineField({
            name: 'alt',
            title: 'Alt Text',
            description: 'Describes the image for screen readers and SEO.',
            type: 'string',
            validation: Rule => Rule.required()
          }),
          defineField({
            name: 'size',
            title: 'Size',
            description: 'How wide the image displays on the page.',
            type: 'string',
            options: {
              list: [
                { title: 'Small', value: 'small' },
                { title: 'Medium', value: 'medium' },
                { title: 'Large (full width)', value: 'large' }
              ],
              layout: 'radio'
            },
            initialValue: 'large'
          }),
          defineField({
            name: 'customDimensions',
            title: 'Custom Dimensions',
            description:
              "Overrides Size above with an exact width/height, in pixels or as a percentage of the image's normal width.",
            type: 'object',
            options: { columns: 3 },
            fields: [
              defineField({ name: 'width', title: 'Width', type: 'number' }),
              defineField({ name: 'height', title: 'Height', type: 'number' }),
              defineField({
                name: 'unit',
                title: 'Unit',
                type: 'string',
                options: {
                  list: [
                    { title: 'px', value: 'px' },
                    { title: '%', value: '%' }
                  ],
                  layout: 'radio',
                  direction: 'horizontal'
                },
                initialValue: 'px'
              })
            ]
          }),
          defineField({
            name: 'alignment',
            title: 'Alignment',
            description:
              "Where the image sits horizontally when it's narrower than full width.",
            type: 'string',
            options: {
              list: [
                { title: 'Left', value: 'left' },
                { title: 'Center', value: 'center' },
                { title: 'Right', value: 'right' }
              ],
              layout: 'radio'
            },
            initialValue: 'center'
          })
        ]
      })
    ]
  });
