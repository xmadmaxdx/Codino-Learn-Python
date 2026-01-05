import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../../../constants/colors';
import { FormattedText } from '../FormattedText';

interface ComparisonItem {
    label: string;
    description: string; // Can be a code snippet or text
    isCode?: boolean;
    color?: string;
    icon?: keyof typeof MaterialIcons.glyphMap;
}

interface DataComparisonLensProps {
    left: ComparisonItem;
    right: ComparisonItem;
    title?: string;
    containerStyle?: ViewStyle;
}

export const DataComparisonLens: React.FC<DataComparisonLensProps> = ({
    left,
    right,
    title = 'Structure Comparison',
    containerStyle
}) => {
    return (
        <View style={[styles.container, containerStyle]}>
            <View style={styles.header}>
                <MaterialIcons name="compare" size={20} color={COLORS.primaryLight} />
                <Text style={styles.title}>{title}</Text>
            </View>

            <View style={styles.comparisonContainer}>
                {/* Left Side */}
                <View style={styles.side}>
                    <View style={[styles.iconBadge, { backgroundColor: `${left.color || COLORS.blue400}20` }]}>
                        <MaterialIcons
                            name={left.icon || 'code'}
                            size={20}
                            color={left.color || COLORS.blue400}
                        />
                    </View>
                    <Text style={[styles.itemLabel, { color: left.color || COLORS.blue400 }]}>
                        {left.label}
                    </Text>
                    <View style={styles.contentBox}>
                        <FormattedText
                            content={left.description}
                            style={[styles.contentText, left.isCode && styles.codeFont]}
                        />
                    </View>
                </View>

                {/* Divider */}
                <View style={styles.divider}>
                    <View style={styles.vsBadge}>
                        <Text style={styles.vsText}>VS</Text>
                    </View>
                </View>

                {/* Right Side */}
                <View style={styles.side}>
                    <View style={[styles.iconBadge, { backgroundColor: `${right.color || COLORS.orange400}20` }]}>
                        <MaterialIcons
                            name={right.icon || 'code'}
                            size={20}
                            color={right.color || COLORS.orange400}
                        />
                    </View>
                    <Text style={[styles.itemLabel, { color: right.color || COLORS.orange400 }]}>
                        {right.label}
                    </Text>
                    <View style={styles.contentBox}>
                        <FormattedText
                            content={right.description}
                            style={[styles.contentText, right.isCode && styles.codeFont]}
                        />
                    </View>
                </View>
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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 16,
    },
    title: {
        color: COLORS.primaryLight,
        fontSize: 14,
        fontFamily: 'SpaceGrotesk_700Bold',
        letterSpacing: 0.5,
        textTransform: 'uppercase',
    },
    comparisonContainer: {
        flexDirection: 'row',
        alignItems: 'stretch', // Make heights matching
    },
    side: {
        flex: 1,
        alignItems: 'center',
        padding: 8,
    },
    iconBadge: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
    itemLabel: {
        fontSize: 14,
        fontFamily: 'SpaceGrotesk_700Bold',
        marginBottom: 12,
        height: 20, // Alignment enforcement
    },
    contentBox: {
        backgroundColor: COLORS.backgroundDark,
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: COLORS.whiteAlpha10,
        width: '100%',
        alignItems: 'center',
        flexGrow: 1, // Fill height
        justifyContent: 'center',
    },
    contentText: {
        color: COLORS.gray300,
        fontSize: 13,
        textAlign: 'center',
        fontFamily: 'NotoSans_400Regular',
    },
    codeFont: {
        fontFamily: 'monospace',
        fontSize: 12,
    },
    divider: {
        width: 2,
        backgroundColor: COLORS.whiteAlpha5,
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 4,
    },
    vsBadge: {
        position: 'absolute',
        backgroundColor: COLORS.surfaceDark,
        paddingVertical: 4,
        paddingHorizontal: 6,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: COLORS.whiteAlpha20,
    },
    vsText: {
        color: COLORS.gray500,
        fontSize: 10,
        fontFamily: 'SpaceGrotesk_700Bold',
    },
});
