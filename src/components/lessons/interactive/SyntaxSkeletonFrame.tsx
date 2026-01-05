import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { COLORS } from '../../../constants/colors';

interface SyntaxPart {
    text?: string;
    type: 'keyword' | 'placeholder' | 'symbol' | 'text' | 'newline' | 'indent';
    hint?: string; // Optional overlay text for placeholder e.g. "condition"
}

interface SyntaxSkeletonFrameProps {
    parts: SyntaxPart[];
    title?: string;
    containerStyle?: ViewStyle;
}

export const SyntaxSkeletonFrame: React.FC<SyntaxSkeletonFrameProps> = ({
    parts,
    title = 'Syntax Structure',
    containerStyle
}) => {
    return (
        <View style={[styles.container, containerStyle]}>
            {title && <Text style={styles.title}>{title}</Text>}

            <View style={styles.skeletonContainer}>
                {parts.map((part, index) => {
                    if (part.type === 'newline') {
                        return <View key={index} style={{ width: '100%', height: 8 }} />;
                    }

                    if (part.type === 'indent') {
                        return <View key={index} style={{ width: 24 }} />;
                    }

                    const isPlaceholder = part.type === 'placeholder';
                    const isKeyword = part.type === 'keyword';

                    return (
                        <View key={index} style={styles.partContainer}>
                            {isPlaceholder ? (
                                <View style={styles.placeholderBox}>
                                    <Text style={styles.placeholderText}>{part.text}</Text>
                                    {part.hint && <Text style={styles.hintText}>{part.hint}</Text>}
                                </View>
                            ) : (
                                <Text style={[
                                    styles.fixedText,
                                    isKeyword && styles.keywordText,
                                    part.type === 'symbol' && styles.symbolText
                                ]}>
                                    {part.text}
                                </Text>
                            )}
                        </View>
                    );
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.cardDark,
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: COLORS.whiteAlpha5,
        marginVertical: 12,
    },
    title: {
        color: COLORS.gray400,
        fontSize: 12,
        fontFamily: 'SpaceGrotesk_700Bold',
        marginBottom: 12,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    skeletonContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 12, // Increased gap
        backgroundColor: COLORS.backgroundDark,
        padding: 16,
        paddingBottom: 24, // Added more bottom padding for hints
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.whiteAlpha10,
    },
    partContainer: {
        justifyContent: 'center',
    },
    fixedText: {
        fontSize: 18,
        fontFamily: 'monospace',
        color: COLORS.white,
    },
    keywordText: {
        color: COLORS.primaryLight, // Purple for keywords
        fontWeight: 'bold',
    },
    symbolText: {
        color: COLORS.whiteAlpha60,
    },
    placeholderBox: {
        backgroundColor: COLORS.whiteAlpha5,
        borderWidth: 1,
        borderColor: COLORS.whiteAlpha20,
        borderStyle: 'dashed',
        borderRadius: 6,
        paddingHorizontal: 12, // Increased padding
        paddingVertical: 6,   // Increased padding
        minWidth: 60,         // Increased minWidth to prevent label wrapping
        alignItems: 'center',
        position: 'relative',
    },
    placeholderText: {
        color: COLORS.gray300, // Lightened color for better visibility
        fontFamily: 'monospace',
        fontSize: 14,
    },
    hintText: {
        position: 'absolute',
        bottom: -20,
        left: -60,   // Wider reach for centering without wrapping
        right: -60,  // Wider reach for centering without wrapping
        textAlign: 'center',
        fontSize: 9,
        color: COLORS.gray500,
        fontFamily: 'NotoSans_400Regular',
    },
});
