import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../../../constants/colors';

interface IterationRangeExplorerProps {
    start: number;
    stop: number;
    step?: number;
    title?: string;
    containerStyle?: ViewStyle;
}

export const IterationRangeExplorer: React.FC<IterationRangeExplorerProps> = ({
    start,
    stop,
    step = 1,
    title = 'Range Explorer',
    containerStyle
}) => {

    // Generate numbers in range
    const generateRange = () => {
        const numbers = [];
        let count = 0;
        for (let i = start; step > 0 ? i < stop : i > stop; i += step) {
            numbers.push(i);
            count++;
            if (count > 15) break;
        }
        return { numbers, limited: count > 15 };
    };

    const { numbers, limited } = generateRange();

    return (
        <View style={[styles.outerContainer, containerStyle]}>
            <LinearGradient
                colors={['rgba(127, 13, 242, 0.05)', 'rgba(127, 13, 242, 0.01)']}
                style={styles.container}
            >
                <View style={styles.header}>
                    <View style={styles.headerTitleRow}>
                        <View style={styles.headerIconWrapper}>
                            <MaterialIcons name="loop" size={16} color={COLORS.primaryLight} />
                        </View>
                        <Text style={styles.titleText}>{title}</Text>
                    </View>

                    <View style={styles.codeBadge}>
                        <Text style={styles.codeText}>
                            range({start}, {stop}{step !== 1 ? `, ${step}` : ''})
                        </Text>
                    </View>
                </View>

                <View style={styles.visualTrack}>
                    <View style={styles.trackLine} />

                    <View style={styles.numbersRow}>
                        {numbers.map((num, i) => (
                            <View key={i} style={styles.numberNode}>
                                <LinearGradient
                                    colors={i === 0 ? [COLORS.green500, COLORS.green400] : [COLORS.primary, COLORS.primaryDark]}
                                    style={[
                                        styles.nodeCircle,
                                        i === 0 && styles.startNode,
                                        i === numbers.length - 1 && limited && styles.endNode
                                    ]}
                                >
                                    <Text style={styles.numberText}>{num}</Text>
                                </LinearGradient>

                                {/* Connector to next */}
                                {i < numbers.length - 1 && (
                                    <View style={styles.connector}>
                                        <View style={styles.stepIndicatorContainer}>
                                            <Text style={styles.stepLabel}>+{step}</Text>
                                            <MaterialIcons name="chevron-right" size={14} color={COLORS.gray400} />
                                        </View>
                                    </View>
                                )}
                            </View>
                        ))}
                        {limited && (
                            <View style={styles.continuation}>
                                <MaterialIcons name="more-horiz" size={24} color={COLORS.gray500} />
                            </View>
                        )}
                    </View>
                </View>

                <View style={styles.legend}>
                    <View style={styles.legendItem}>
                        <View style={[styles.legendDot, { backgroundColor: COLORS.green400 }]} />
                        <Text style={styles.legendText}>Start (Inclusive)</Text>
                    </View>
                    <View style={styles.legendItem}>
                        <View style={[styles.legendDot, { borderColor: COLORS.gray500, borderWidth: 1, backgroundColor: 'transparent' }]} />
                        <Text style={styles.legendText}>Stop (Exclusive)</Text>
                    </View>
                </View>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    outerContainer: {
        marginVertical: 16,
        borderRadius: 24,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.08)',
        backgroundColor: COLORS.cardDark,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
    },
    container: {
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
        gap: 8,
        flexWrap: 'wrap',
    },
    headerTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    headerIconWrapper: {
        width: 28,
        height: 28,
        borderRadius: 8,
        backgroundColor: 'rgba(157, 77, 255, 0.15)',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(157, 77, 255, 0.2)',
    },
    titleText: {
        color: COLORS.primaryLight,
        fontSize: 11,
        fontFamily: 'SpaceGrotesk_700Bold',
        letterSpacing: 1.5,
        textTransform: 'uppercase',
    },
    codeBadge: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: 'rgba(157, 77, 255, 0.3)',
    },
    codeText: {
        color: COLORS.primaryLight,
        fontFamily: 'monospace',
        fontSize: 12,
        fontWeight: '700',
    },
    visualTrack: {
        position: 'relative',
        paddingVertical: 12,
        marginBottom: 4,
    },
    trackLine: {
        position: 'absolute',
        top: '58%',
        left: 0,
        right: 0,
        height: 1.5,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        zIndex: 0,
    },
    numbersRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 0,
    },
    numberNode: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    nodeCircle: {
        width: 28,
        height: 28,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
        zIndex: 2,
    },
    startNode: {
        shadowColor: COLORS.green500,
    },
    endNode: {
        borderColor: COLORS.red400,
    },
    numberText: {
        color: COLORS.white,
        fontFamily: 'SpaceGrotesk_700Bold',
        fontSize: 12,
    },
    connector: {
        paddingHorizontal: 0,
        justifyContent: 'center',
        height: 28,
    },
    stepIndicatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        paddingHorizontal: 4,
        paddingVertical: 1,
        borderRadius: 6,
        marginHorizontal: 3,
        marginTop: 12,
    },
    stepLabel: {
        color: COLORS.gray400,
        fontSize: 9,
        fontFamily: 'SpaceGrotesk_500Medium',
        marginRight: -1,
    },
    continuation: {
        marginLeft: 6,
        paddingTop: 4,
    },
    legend: {
        flexDirection: 'row',
        gap: 16,
        marginTop: 8,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255, 255, 255, 0.05)',
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    legendDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
    },
    legendText: {
        color: COLORS.gray500,
        fontSize: 11,
        fontFamily: 'NotoSans_400Regular',
    }
});
