// Unified theme export
export { colors, default as colorsDefault } from './colors';
export {
    fontFamilies,
    fontSizes,
    lineHeights,
    fontWeights,
    textStyles,
    default as typography
} from './typography';
export { spacing, borderRadius, default as spacingDefault } from './spacing';

import colors from './colors';
import typography from './typography';
import spacingModule from './spacing';

const theme = {
    colors,
    ...typography,
    ...spacingModule,
};

export default theme;
