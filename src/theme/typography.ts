// Typography configuration matching the guide's font setup
// Display: Space Grotesk
// Body: Noto Sans

export const fontFamilies = {
    display: 'SpaceGrotesk_400Regular',
    displayMedium: 'SpaceGrotesk_500Medium',
    displayBold: 'SpaceGrotesk_700Bold',
    displayLight: 'SpaceGrotesk_300Light',
    body: 'NotoSans_400Regular',
    bodyMedium: 'NotoSans_500Medium',
    bodyBold: 'NotoSans_700Bold',
};

export const fontSizes = {
    xs: 10,
    sm: 12,
    base: 14,
    md: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
};

export const lineHeights = {
    none: 1,
    tight: 1.1,
    snug: 1.25,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
};

export const fontWeights = {
    light: '300' as const,
    normal: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
};

export const textStyles = {
    // Headings
    h1: {
        fontFamily: fontFamilies.displayBold,
        fontSize: fontSizes['4xl'],
        lineHeight: lineHeights.tight,
    },
    h2: {
        fontFamily: fontFamilies.displayBold,
        fontSize: fontSizes['3xl'],
        lineHeight: lineHeights.tight,
    },
    h3: {
        fontFamily: fontFamilies.displayBold,
        fontSize: fontSizes['2xl'],
        lineHeight: lineHeights.snug,
    },
    h4: {
        fontFamily: fontFamilies.displayBold,
        fontSize: fontSizes.xl,
        lineHeight: lineHeights.snug,
    },

    // Body text
    bodyLarge: {
        fontFamily: fontFamilies.body,
        fontSize: fontSizes.lg,
        lineHeight: lineHeights.relaxed,
    },
    bodyBase: {
        fontFamily: fontFamilies.body,
        fontSize: fontSizes.base,
        lineHeight: lineHeights.normal,
    },
    bodySmall: {
        fontFamily: fontFamilies.body,
        fontSize: fontSizes.sm,
        lineHeight: lineHeights.normal,
    },

    // Labels
    labelLarge: {
        fontFamily: fontFamilies.displayBold,
        fontSize: fontSizes.lg,
        lineHeight: lineHeights.none,
    },
    labelBase: {
        fontFamily: fontFamilies.displayBold,
        fontSize: fontSizes.base,
        lineHeight: lineHeights.none,
    },
    labelSmall: {
        fontFamily: fontFamilies.displayBold,
        fontSize: fontSizes.sm,
        lineHeight: lineHeights.none,
    },

    // Captions
    caption: {
        fontFamily: fontFamilies.body,
        fontSize: fontSizes.xs,
        lineHeight: lineHeights.normal,
    },
};

export default {
    fontFamilies,
    fontSizes,
    lineHeights,
    fontWeights,
    textStyles,
};
