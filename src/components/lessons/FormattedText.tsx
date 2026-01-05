import React from 'react';
import { Text, StyleSheet, TextStyle, StyleProp } from 'react-native';
import { COLORS } from '../../constants/colors';

interface FormattedTextProps {
    content: string;
    style?: StyleProp<TextStyle>;
}

/**
 * A reusable component that parses basic markdown-like syntax for premium lesson content.
 * Supported:
 * - **bold** -> Semi-bold weight
 * - `code` -> Monospace font, distinct color
 * - *italic* -> Italic style
 * - __underline__ -> Underline decoration
 */
export const FormattedText: React.FC<FormattedTextProps> = ({ content, style }) => {
    if (!content) return null;

    // Regex to find: **text**, `text`, *text*, __text__, {color:text}
    const parts = content.split(/(\*\*.*?\*\*|`.*?`|\*.*?\*|__.*?__|\{.*?:.*?\})/g);

    const getColor = (colorName: string) => {
        const foundColor = (COLORS as any)[colorName];
        if (foundColor) return foundColor;

        // Friendly mapping
        switch (colorName.toLowerCase()) {
            case 'gold': return COLORS.yellow400;
            case 'cyan': return COLORS.teal400;
            case 'blue': return COLORS.blue400;
            case 'orange': return COLORS.orange400;
            case 'red': return COLORS.red400;
            case 'green': return COLORS.green400;
            default: return COLORS.white;
        }
    };

    return (
        <Text style={[styles.base, style]}>
            {parts.map((part, index) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                    return (
                        <Text key={index} style={styles.bold}>
                            {part.slice(2, -2)}
                        </Text>
                    );
                }
                if (part.startsWith('`') && part.endsWith('`')) {
                    return (
                        <Text key={index} style={styles.code}>
                            {part.slice(1, -1)}
                        </Text>
                    );
                }
                if (part.startsWith('*') && part.endsWith('*')) {
                    return (
                        <Text key={index} style={styles.italic}>
                            {part.slice(1, -1)}
                        </Text>
                    );
                }
                if (part.startsWith('__') && part.endsWith('__')) {
                    return (
                        <Text key={index} style={styles.underline}>
                            {part.slice(2, -2)}
                        </Text>
                    );
                }
                if (part.startsWith('{') && part.endsWith('}') && part.includes(':')) {
                    const [colorName, ...textParts] = part.slice(1, -1).split(':');
                    const textContent = textParts.join(':');
                    const color = getColor(colorName);
                    return (
                        <Text key={index} style={[styles.bold, { color }]}>
                            {textContent}
                        </Text>
                    );
                }
                return <Text key={index}>{part}</Text>;
            })}
        </Text>
    );
};

const styles = StyleSheet.create({
    base: {
        fontSize: 16,
        fontFamily: 'NotoSans_400Regular',
        color: COLORS.whiteAlpha80,
        lineHeight: 26,
    },
    bold: {
        fontFamily: 'SpaceGrotesk_700Bold',
        color: COLORS.white,
    },
    code: {
        fontFamily: 'monospace',
        color: COLORS.primaryLight,
        backgroundColor: COLORS.whiteAlpha10,
        paddingHorizontal: 4,
        borderRadius: 4,
        fontSize: 14,
    },
    italic: {
        fontStyle: 'italic',
        color: COLORS.whiteAlpha90,
    },
    underline: {
        textDecorationLine: 'underline',
        textDecorationColor: COLORS.primary,
    },
});
