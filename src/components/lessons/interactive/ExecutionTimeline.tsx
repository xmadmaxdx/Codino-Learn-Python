import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../../../constants/colors';

interface ExecutionStep {
    line: number;
    code: string;
    status?: 'active' | 'pending' | 'completed' | 'error';
    variables?: Record<string, string>;
    comment?: string;
}

interface ExecutionTimelineProps {
    steps: ExecutionStep[];
    currentLine?: number;
    title?: string;
    containerStyle?: ViewStyle;
}

export const ExecutionTimeline: React.FC<ExecutionTimelineProps> = ({
    steps,
    currentLine,
    title = 'Execution Flow',
    containerStyle
}) => {
    return (
        <View style={[styles.outerContainer, containerStyle]}>
            <LinearGradient
                colors={['rgba(96, 165, 250, 0.1)', 'rgba(96, 165, 250, 0.02)']}
                style={styles.container}
            >
                <View style={styles.header}>
                    <View style={styles.headerIconWrapper}>
                        <MaterialIcons name="timeline" size={16} color={COLORS.blue400} />
                    </View>
                    <Text style={styles.title}>{title}</Text>
                </View>

                <View style={styles.timelineContainer}>
                    {/* Vertical Laser Line */}
                    <View style={styles.laserLineContainer}>
                        <LinearGradient
                            colors={['rgba(255, 255, 255, 0.05)', COLORS.blue400, 'rgba(255, 255, 255, 0.05)']}
                            style={styles.laserLine}
                        />
                    </View>

                    <View style={styles.stepsList}>
                        {steps.map((step, index) => {
                            const isActive = step.line === currentLine || step.status === 'active';
                            const isPast = step.status === 'completed' || (currentLine !== undefined && step.line < currentLine);
                            const isError = step.status === 'error';

                            return (
                                <View key={index} style={styles.stepRow}>
                                    {/* Indicator Ball */}
                                    <View style={styles.indicatorContainer}>
                                        <View style={[
                                            styles.indicatorBall,
                                            isActive && styles.activeBall,
                                            isPast && styles.pastBall,
                                            isError && styles.errorBall
                                        ]}>
                                            {isPast && <MaterialIcons name="check" size={10} color={COLORS.white} />}
                                            {isError && <MaterialIcons name="priority-high" size={10} color={COLORS.white} />}
                                            {isActive && <View style={styles.activeCore} />}
                                        </View>
                                    </View>

                                    {/* Content Card */}
                                    <LinearGradient
                                        colors={isActive ? ['rgba(59, 130, 246, 0.2)', 'rgba(59, 130, 246, 0.05)'] : ['transparent', 'transparent']}
                                        style={[
                                            styles.stepContent,
                                            isActive && styles.activeContent,
                                            isError && styles.errorContent,
                                            !isActive && !isPast && !isError && styles.futureContent
                                        ]}
                                    >
                                        <View style={styles.stepTop}>
                                            <Text style={[styles.stepCode, isActive && styles.activeCodeText]}>
                                                {step.code}
                                            </Text>
                                            <Text style={styles.stepLine}>Line {step.line}</Text>
                                        </View>

                                        {(step.comment || (step.variables && isActive)) && (
                                            <View style={styles.stepBottom}>
                                                {step.comment && (
                                                    <Text style={[styles.stepComment, isActive && styles.activeCommentText]}>
                                                        {step.comment}
                                                    </Text>
                                                )}
                                                {step.variables && isActive && (
                                                    <View style={styles.variableBadgeContainer}>
                                                        {Object.entries(step.variables).map(([key, val]) => (
                                                            <View key={key} style={styles.variableBadge}>
                                                                <Text style={styles.variableKey}>{key}: </Text>
                                                                <Text style={styles.variableValue}>{val}</Text>
                                                            </View>
                                                        ))}
                                                    </View>
                                                )}
                                            </View>
                                        )}
                                    </LinearGradient>
                                </View>
                            );
                        })}
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
        padding: 24,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 28,
    },
    headerIconWrapper: {
        width: 32,
        height: 32,
        borderRadius: 10,
        backgroundColor: 'rgba(96, 165, 250, 0.15)',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(96, 165, 250, 0.2)',
    },
    title: {
        color: COLORS.blue400,
        fontSize: 13,
        fontFamily: 'SpaceGrotesk_700Bold',
        letterSpacing: 2,
        textTransform: 'uppercase',
    },
    timelineContainer: {
        flexDirection: 'row',
        position: 'relative',
    },
    laserLineContainer: {
        width: 24,
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
    },
    laserLine: {
        width: 2,
        height: '100%',
        opacity: 0.2,
    },
    stepsList: {
        flex: 1,
        gap: 10,
    },
    stepRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    indicatorContainer: {
        width: 24,
        alignItems: 'center',
        paddingTop: 14,
        zIndex: 10,
    },
    indicatorBall: {
        width: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: COLORS.surfaceDark,
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    activeBall: {
        borderColor: COLORS.blue400,
        backgroundColor: COLORS.cardDark,
        elevation: 4,
        shadowColor: COLORS.blue400,
        shadowOpacity: 0.5,
        shadowRadius: 10,
    },
    activeCore: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: COLORS.blue400,
    },
    pastBall: {
        backgroundColor: COLORS.green500,
        borderColor: COLORS.green400,
    },
    errorBall: {
        backgroundColor: COLORS.red400,
        borderColor: '#f87171', // specific light red
    },
    stepContent: {
        flex: 1,
        marginLeft: 8,
        padding: 14,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
        backgroundColor: 'rgba(255, 255, 255, 0.01)',
    },
    activeContent: {
        borderColor: 'rgba(59, 130, 246, 0.4)',
    },
    errorContent: {
        borderColor: 'rgba(248, 113, 113, 0.4)',
        backgroundColor: 'rgba(248, 113, 113, 0.05)',
    },
    futureContent: {
        opacity: 0.4,
    },
    stepTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    stepCode: {
        color: '#d1d5db',
        fontFamily: 'monospace',
        fontSize: 14,
        fontWeight: '700',
    },
    activeCodeText: {
        color: COLORS.white,
    },
    stepLine: {
        color: COLORS.gray500,
        fontSize: 9,
        fontFamily: 'SpaceGrotesk_700Bold',
        letterSpacing: 0.5,
    },
    stepBottom: {
        marginTop: 8,
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255, 255, 255, 0.05)',
    },
    stepComment: {
        color: COLORS.gray500,
        fontSize: 12,
        fontFamily: 'NotoSans_400Regular',
    },
    activeCommentText: {
        color: COLORS.blue400,
    },
    variableBadgeContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginTop: 8,
    },
    variableBadge: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    variableKey: {
        color: COLORS.gray400,
        fontSize: 11,
        fontFamily: 'monospace',
    },
    variableValue: {
        color: COLORS.yellow400,
        fontSize: 11,
        fontFamily: 'monospace',
        fontWeight: 'bold',
    },
});
