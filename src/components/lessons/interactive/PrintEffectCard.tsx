import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../../../constants/colors';

interface PrintEffectCardProps {
    value: string; // The raw value
    output: string; // The formatted output
    containerStyle?: ViewStyle;
}

export const PrintEffectCard: React.FC<PrintEffectCardProps> = ({
    value,
    output,
    containerStyle
}) => {
    return (
        <View style={[styles.container, containerStyle]}>
            <View style={styles.contentRow}>
                {/* Left: Memory / Internal Value */}
                <View style={styles.side}>
                    <View style={styles.headerRow}>
                        <MaterialIcons name="memory" size={16} color={COLORS.gray400} />
                        <Text style={styles.headerTitle}>MEMORY (Raw)</Text>
                    </View>
                    <View style={styles.valueBox}>
                        <Text style={styles.valueText}>{value}</Text>
                    </View>
                </View>

                {/* Divider */}
                <View style={styles.divider}>
                    <View style={styles.line} />
                    <View style={styles.printBadge}>
                        <MaterialIcons name="print" size={14} color={COLORS.primaryLight} />
                        <Text style={styles.printText}>print()</Text>
                    </View>
                    <View style={styles.line} />
                </View>

                {/* Right: Terminal Output */}
                <View style={styles.side}>
                    <View style={styles.headerRow}>
                        <MaterialIcons name="terminal" size={16} color={COLORS.green400} />
                        <Text style={styles.headerTitle}>TERMINAL (View)</Text>
                    </View>
                    <View style={styles.terminalBox}>
                        <Text style={styles.terminalText}>{output}</Text>
                        <View style={styles.cursor} />
                    </View>
                </View>
            </View>

            <View style={styles.footer}>
                <Text style={styles.footerText}>
                    Prints formatted text to screen.
                    <Text style={{ color: COLORS.primaryLight }}> Does not change</Text> the original data.
                </Text>
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
    contentRow: {
        flexDirection: 'row',
        alignItems: 'stretch',
    },
    side: {
        flex: 1,
        gap: 8,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        justifyContent: 'center',
    },
    headerTitle: {
        color: COLORS.gray500,
        fontSize: 10,
        fontFamily: 'SpaceGrotesk_700Bold',
        letterSpacing: 0.5,
    },
    valueBox: {
        backgroundColor: COLORS.backgroundDark,
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: COLORS.whiteAlpha10,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        minHeight: 50,
    },
    valueText: {
        color: COLORS.gray300,
        fontFamily: 'monospace',
        fontSize: 13,
    },
    terminalBox: {
        backgroundColor: '#000000',
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: COLORS.whiteAlpha10,
        alignItems: 'flex-start',
        justifyContent: 'center',
        flex: 1,
        minHeight: 50,
        flexDirection: 'row',
    },
    terminalText: {
        color: COLORS.green400,
        fontFamily: 'monospace',
        fontSize: 13,
    },
    cursor: {
        width: 8,
        height: 14,
        backgroundColor: COLORS.green400,
        marginLeft: 2,
        opacity: 0.5,
    },
    divider: {
        width: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    line: {
        width: 1,
        flex: 1,
        backgroundColor: COLORS.whiteAlpha10,
    },
    printBadge: {
        backgroundColor: COLORS.surfaceDark,
        paddingHorizontal: 6,
        paddingVertical: 4,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: COLORS.primaryAlpha50,
        alignItems: 'center',
        gap: 2,
        marginVertical: 8,
    },
    printText: {
        color: COLORS.primaryLight,
        fontSize: 9,
        fontFamily: 'monospace',
        fontWeight: 'bold',
    },
    footer: {
        marginTop: 16,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: COLORS.whiteAlpha5,
        alignItems: 'center',
    },
    footerText: {
        color: COLORS.gray500,
        fontSize: 11,
        textAlign: 'center',
        fontStyle: 'italic',
    },
});
