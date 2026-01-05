import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../../../constants/colors';

interface LoopIteration {
    iteration: number;
    variables: Record<string, string | number>;
    output?: string;
    isCurrent?: boolean;
}

interface LoopCycleViewerProps {
    iterations: LoopIteration[];
    type?: 'for' | 'while';
    title?: string;
    containerStyle?: ViewStyle;
}

export const LoopCycleViewer: React.FC<LoopCycleViewerProps> = ({
    iterations,
    type = 'for',
    title = 'Loop Cycle',
    containerStyle
}) => {
    const [activeIndex, setActiveIndex] = useState(0);

    if (!iterations || iterations.length === 0) {
        return null;
    }

    const activeIteration = iterations[activeIndex];

    return (
        <View style={[styles.container, containerStyle]}>
            <View style={styles.header}>
                <View style={styles.headerIconContainer}>
                    <MaterialIcons
                        name={type === 'for' ? 'repeat' : 'loop'}
                        size={20}
                        color={COLORS.green400}
                    />
                </View>
                <Text style={styles.title}>{title}</Text>
            </View>

            {/* Pagination / Stepper */}
            <View style={styles.stepperContainer}>
                {iterations.map((_, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => setActiveIndex(index)}
                        style={[
                            styles.stepDot,
                            index === activeIndex && styles.stepDotActive,
                            index < activeIndex && styles.stepDotCompleted
                        ]}
                    >
                        {index === activeIndex && <View style={styles.stepDotInner} />}
                    </TouchableOpacity>
                ))}
            </View>

            {/* Active Iteration Card */}
            <LinearGradient
                colors={[COLORS.whiteAlpha5, 'transparent']}
                style={styles.card}
            >
                <View style={styles.cardHeader}>
                    <Text style={styles.iterationLabel}>Iteration {activeIteration.iteration}</Text>
                    {activeIteration.isCurrent && (
                        <View style={styles.currentBadge}>
                            <Text style={styles.currentBadgeText}>CURRENT</Text>
                        </View>
                    )}
                </View>

                {/* Variable State */}
                <View style={styles.varContainer}>
                    {Object.entries(activeIteration.variables).map(([key, value]) => (
                        <View key={key} style={styles.variableRow}>
                            <Text style={styles.varName}>{key}</Text>
                            <MaterialIcons name="arrow-right-alt" size={16} color={COLORS.gray500} />
                            <View style={styles.varValueBox}>
                                <Text style={styles.varValue}>{String(value)}</Text>
                            </View>
                        </View>
                    ))}
                </View>

                {/* Optional Output */}
                {activeIteration.output && (
                    <View style={styles.outputSection}>
                        <Text style={styles.outputLabel}>Output:</Text>
                        <Text style={styles.outputText}>&gt; {activeIteration.output}</Text>
                    </View>
                )}
            </LinearGradient>

            {/* Navigation Controls */}
            <View style={styles.controls}>
                <TouchableOpacity
                    style={[styles.navBtn, activeIndex === 0 && styles.navBtnDisabled]}
                    onPress={() => activeIndex > 0 && setActiveIndex(activeIndex - 1)}
                    disabled={activeIndex === 0}
                >
                    <MaterialIcons name="chevron-left" size={24} color={activeIndex === 0 ? COLORS.gray500 : COLORS.white} />
                </TouchableOpacity>

                <Text style={styles.stepCounterText}>
                    {activeIndex + 1} / {iterations.length}
                </Text>

                <TouchableOpacity
                    style={[styles.navBtn, activeIndex === iterations.length - 1 && styles.navBtnDisabled]}
                    onPress={() => activeIndex < iterations.length - 1 && setActiveIndex(activeIndex + 1)}
                    disabled={activeIndex === iterations.length - 1}
                >
                    <MaterialIcons name="chevron-right" size={24} color={activeIndex === iterations.length - 1 ? COLORS.gray500 : COLORS.white} />
                </TouchableOpacity>
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
        gap: 12,
        marginBottom: 16,
    },
    headerIconContainer: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: COLORS.green400,
        fontSize: 16,
        fontFamily: 'SpaceGrotesk_700Bold',
    },
    stepperContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 8,
        marginBottom: 16,
        flexWrap: 'wrap',
    },
    stepDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: COLORS.whiteAlpha10,
    },
    stepDotActive: {
        backgroundColor: COLORS.green500,
        width: 12, // Slight scale up
        height: 12,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: COLORS.backgroundDark,
        elevation: 4,
    },
    stepDotCompleted: {
        backgroundColor: COLORS.green400,
        opacity: 0.5,
    },
    stepDotInner: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: COLORS.white,
    },
    card: {
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: COLORS.whiteAlpha10,
        backgroundColor: COLORS.surfaceDark,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    iterationLabel: {
        color: COLORS.white,
        fontSize: 18,
        fontFamily: 'SpaceGrotesk_700Bold',
    },
    currentBadge: {
        backgroundColor: 'rgba(34, 197, 94, 0.2)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    currentBadgeText: {
        color: COLORS.green400,
        fontSize: 10,
        fontFamily: 'SpaceGrotesk_700Bold',
    },
    varContainer: {
        gap: 8,
    },
    variableRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        backgroundColor: COLORS.backgroundDark,
        padding: 8,
        borderRadius: 8,
    },
    varName: {
        color: COLORS.gray300,
        fontFamily: 'monospace',
        fontSize: 14,
        minWidth: 30,
    },
    varValueBox: {
        backgroundColor: COLORS.whiteAlpha5,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    varValue: {
        color: COLORS.yellow400,
        fontFamily: 'monospace',
        fontWeight: 'bold',
    },
    outputSection: {
        marginTop: 16,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: COLORS.whiteAlpha5,
    },
    outputLabel: {
        color: COLORS.gray500,
        fontSize: 12,
        marginBottom: 4,
    },
    outputText: {
        color: COLORS.gray300,
        fontFamily: 'monospace',
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 16,
    },
    navBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.whiteAlpha5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    navBtnDisabled: {
        opacity: 0.3,
    },
    stepCounterText: {
        color: COLORS.gray400,
        fontFamily: 'SpaceGrotesk_500Medium',
        fontSize: 14,
    },
});
