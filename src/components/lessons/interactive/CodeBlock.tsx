import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { COLORS } from '../../../constants/colors';

interface CodeBlockProps {
    code: string;
    language?: string;
    containerStyle?: ViewStyle;
}

/**
 * A reusable premium code block component for lessons.
 * Supports basic syntax highlighting for Python.
 */
export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'python', containerStyle }) => {

    // Simple Python highlighter
    const renderHighlightedCode = (text: string) => {
        // Regex for basic Python keywords, strings, functions
        const keywords = /\b(def|if|else|elif|for|while|return|import|from|as|class|pass|None|True|False|and|or|not|is|in|lambda)\b/g;
        const functions = /\b(print|len|range|type|int|str|float|bool|list|dict|set|tuple|open|input)\b/g;
        const strings = /(".*?"|'.*?')/g;
        const comments = /(#.*)/g;

        const parts = text.split(/(\b(?:def|if|else|elif|for|while|return|import|from|as|class|pass|None|True|False|and|or|not|is|in|lambda)\b|\b(?:print|len|range|type|int|str|float|bool|list|dict|set|tuple|open|input)\b|".*?"|'.*?'|#.*)/g);

        return (
            <Text style={styles.codeText}>
                {parts.map((part, index) => {
                    if (keywords.test(part)) {
                        keywords.lastIndex = 0; // Reset regex
                        return <Text key={index} style={styles.keyword}>{part}</Text>;
                    }
                    if (functions.test(part)) {
                        functions.lastIndex = 0;
                        return <Text key={index} style={styles.function}>{part}</Text>;
                    }
                    if (strings.test(part)) {
                        strings.lastIndex = 0;
                        return <Text key={index} style={styles.string}>{part}</Text>;
                    }
                    if (comments.test(part)) {
                        comments.lastIndex = 0;
                        return <Text key={index} style={styles.comment}>{part}</Text>;
                    }
                    return <Text key={index}>{part}</Text>;
                })}
            </Text>
        );
    };

    return (
        <View style={[styles.container, containerStyle]}>
            <View style={styles.header}>
                <View style={styles.dots}>
                    <View style={[styles.dot, { backgroundColor: '#ff5f56' }]} />
                    <View style={[styles.dot, { backgroundColor: '#ffbd2e' }]} />
                    <View style={[styles.dot, { backgroundColor: '#27c93f' }]} />
                </View>
                <Text style={styles.langLabel}>{language.toUpperCase()}</Text>
            </View>
            <View style={styles.codeArea}>
                {renderHighlightedCode(code)}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#0f0f12',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.whiteAlpha10,
        marginVertical: 12,
        overflow: 'hidden',
    },
    header: {
        height: 36,
        backgroundColor: COLORS.whiteAlpha5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.whiteAlpha5,
    },
    dots: {
        flexDirection: 'row',
        gap: 6,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        opacity: 0.8,
    },
    langLabel: {
        fontSize: 10,
        color: COLORS.gray500,
        fontFamily: 'SpaceGrotesk_700Bold',
        letterSpacing: 1,
    },
    codeArea: {
        padding: 16,
    },
    codeText: {
        fontFamily: 'monospace',
        fontSize: 14,
        color: '#abb2bf', // Default One Dark atom color or similar
        lineHeight: 20,
    },
    // One Dark inspired syntax colors
    keyword: {
        color: '#c678dd', // Purple
    },
    function: {
        color: '#61afef', // Blue
    },
    string: {
        color: '#98c379', // Green
    },
    comment: {
        color: '#5c6370', // Gray
        fontStyle: 'italic',
    },
});
