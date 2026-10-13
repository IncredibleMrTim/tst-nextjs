export interface CompanyLogo {
  src: string;
  srcSet?: string;
  sizes?: string;
  width?: number;
  height?: number;
}

const LOGO_PATH = '/images/logos';

/**
 * Builds a logo from files pre-sized for 1x, 2x and 3x screens, so each device
 * downloads only the pixels it can show.
 */
const buildRasterLogo = (
  name: string,
  widths: [number, number, number],
  heights: [number, number, number],
  sizes: string
): CompanyLogo => ({
  src: `${LOGO_PATH}/${name}-${widths[1]}.webp`,
  srcSet: widths
    .map(width => `${LOGO_PATH}/${name}-${width}.webp ${width}w`)
    .join(', '),
  sizes,
  width: widths[0],
  height: heights[0]
});

const buildVectorLogo = (name: string): CompanyLogo => ({
  src: `${LOGO_PATH}/${name}.svg`
});

// `sizes` mirrors the widest each logo is painted inside its tile (CompanyLogo.tsx)
const WIDE_TILE_SIZES = '(max-width: 560px) 80px, 100px';

/**
 * Logos keyed by the `logo` column on an experience. A role with no entry
 * falls back to the company's initials.
 */
export const companyLogos: Record<string, CompanyLogo> = {
  astrazeneca: buildVectorLogo('astrazeneca'),
  santander: buildVectorLogo('santander'),
  coyote: buildVectorLogo('coyote'),
  mdrxtech: buildVectorLogo('mdrxtech'),
  ons: buildVectorLogo('ons'),
  lexisnexis: buildVectorLogo('lexisnexis'),
  tauranga: buildVectorLogo('tauranga'),
  proagrica: buildRasterLogo(
    'proagrica',
    [100, 199, 298],
    [31, 61, 92],
    WIDE_TILE_SIZES
  ),
  webree: buildRasterLogo(
    'webree',
    [100, 199, 298],
    [41, 81, 122],
    WIDE_TILE_SIZES
  ),
  pts: buildRasterLogo('pts', [100, 199, 298], [31, 61, 91], WIDE_TILE_SIZES),
  wvs: buildRasterLogo('wvs', [100, 199, 298], [45, 89, 134], WIDE_TILE_SIZES),
  elanco: buildRasterLogo(
    'elanco',
    [89, 177, 266],
    [45, 90, 135],
    '(max-width: 560px) 76px, 89px'
  )
};
