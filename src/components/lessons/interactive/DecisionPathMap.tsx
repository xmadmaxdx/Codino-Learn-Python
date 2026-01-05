import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../../../constants/colors';

interface DecisionNode {
    id: string;
    label: string;
    type: 'condition' | 'action' | 'start' | 'end';
}

interface PathStep {
    fromId: string;
    toId: string;
    label?: string; // e.g., "True" or "False"
    isActive: boolean;
}

interface DecisionPathMapProps {
    condition: string;
    result: string; // The text description of the result
    isTruePath: boolean; // Which path was taken
    title?: string;
    containerStyle?: ViewStyle;
}

export const DecisionPathMap: React.FC<DecisionPathMapProps> = ({
    condition,
    result,
    isTruePath,
    title = 'Logic Flow',
    containerStyle
}) => {
    return (
        <View style={[styles.outerContainer, containerStyle]}>
            <LinearGradient
                colors={['rgba(34, 197, 94, 0.05)', 'rgba(59, 130, 246, 0.05)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.container}
            >
                <View style={styles.header}>
                    <View style={styles.headerIconBg}>
                        <MaterialIcons name="call-split" size={16} color={COLORS.blue400} />
                    </View>
                    <Text style={styles.title}>{title}</Text>
                </View>

                <View style={styles.flowContainer}>
                    {/* Condition Node - High Polish Glassmorphism */}
                    <LinearGradient
                        colors={['rgba(59, 130, 246, 0.2)', 'rgba(59, 130, 246, 0.1)']}
                        style={styles.conditionNode}
                    >
                        <Text style={styles.conditionText}>if {condition}:</Text>
                    </LinearGradient>

                    <View style={styles.branchContainer}>
                        <View style={styles.mainLine} />

                        <View style={styles.pathsRow}>
                            {/* True Path */}
                            <View style={styles.pathColumn}>
                                <View style={[styles.diagonalLine, styles.diagonalTrue]} />
                                <View style={[
                                    styles.branchBadge,
                                    isTruePath ? styles.badgeActiveTrue : styles.badgeInactive
                                ]}>
                                    <Text style={[styles.branchText, isTruePath && styles.textWhite]}>True</Text>
                                </View>

                                <LinearGradient
                                    colors={isTruePath ? ['rgba(34, 197, 94, 0.2)', 'rgba(34, 197, 94, 0.05)'] : ['transparent', 'transparent']}
                                    style={[styles.actionCard, isTruePath ? styles.cardActiveTrue : styles.cardInactive]}
                                >
                                    <MaterialIcons
                                        name={isTruePath ? "check-circle" : "radio-button-unchecked"}
                                        size={18}
                                        color={isTruePath ? COLORS.green400 : COLORS.gray500}
                                    />
                                    <Text style={[styles.actionText, !isTruePath && styles.textDimmed]}>
                                        {isTruePath ? result : 'Skipped'}
                                    </Text>
                                </LinearGradient>
                            </View>

                            {/* False Path */}
                            <View style={styles.pathColumn}>
                                <View style={[styles.diagonalLine, styles.diagonalFalse]} />
                                <View style={[
                                    styles.branchBadge,
                                    !isTruePath ? styles.badgeActiveFalse : styles.badgeInactive
                                ]}>
                                    <Text style={[styles.branchText, !isTruePath && styles.textWhite]}>False</Text>
                                </View>

                                <LinearGradient
                                    colors={!isTruePath ? ['rgba(249, 115, 22, 0.2)', 'rgba(249, 115, 22, 0.05)'] : ['transparent', 'transparent']}
                                    style={[styles.actionCard, !isTruePath ? styles.cardActiveFalse : styles.cardInactive]}
                                >
                                    <MaterialIcons
                                        name={!isTruePath ? "cancel" : "radio-button-unchecked"}
                                        size={18}
                                        color={!isTruePath ? COLORS.orange400 : COLORS.gray500}
                                    />
                                    <Text style={[styles.actionText, isTruePath && styles.textDimmed]}>
                                        {!isTruePath ? result : 'Skipped'}
                                    </Text>
                                </LinearGradient>
                            </View>
                        </View>
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
        elevation: 10,
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
    headerIconBg: {
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
    flowContainer: {
        alignItems: 'center',
    },
    conditionNode: {
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(96, 165, 250, 0.4)',
        minWidth: 160,
        alignItems: 'center',
        zIndex: 10,
        elevation: 5,
        shadowColor: COLORS.blue400,
        shadowOpacity: 0.2,
        shadowRadius: 10,
    },
    conditionText: {
        color: COLORS.white,
        fontFamily: 'monospace',
        fontWeight: '700',
        fontSize: 16,
    },
    branchContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: -1, // Overlap for seamless line
    },
    mainLine: {
        width: 2,
        height: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    pathsRow: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        gap: 0,
    },
    pathColumn: {
        flex: 1,
        alignItems: 'center',
    },
    diagonalLine: {
        width: '50%',
        height: 20,
        borderTopWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    diagonalTrue: {
        alignSelf: 'flex-end',
        borderRightWidth: 2,
        borderTopRightRadius: 12,
    },
    diagonalFalse: {
        alignSelf: 'flex-start',
        borderLeftWidth: 2,
        borderTopLeftRadius: 12,
    },
    branchBadge: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 20,
        marginTop: -10,
        borderWidth: 1,
        zIndex: 5,
    },
    badgeInactive: {
        backgroundColor: COLORS.surfaceDark,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    badgeActiveTrue: {
        backgroundColor: COLORS.green500,
        borderColor: COLORS.green400,
    },
    badgeActiveFalse: {
        backgroundColor: COLORS.orange500,
        borderColor: COLORS.orange400,
    },
    branchText: {
        color: COLORS.gray400,
        fontSize: 11,
        fontFamily: 'SpaceGrotesk_700Bold',
        textTransform: 'uppercase',
    },
    textWhite: {
        color: COLORS.white,
    },
    actionCard: {
        marginTop: 12,
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        width: '90%',
    },
    cardInactive: {
        backgroundColor: 'rgba(255, 255, 255, 0.02)',
        borderColor: 'rgba(255, 255, 255, 0.05)',
        opacity: 0.6,
    },
    cardActiveTrue: {
        borderColor: 'rgba(34, 197, 94, 0.4)',
    },
    cardActiveFalse: {
        borderColor: 'rgba(249, 115, 22, 0.4)',
    },
    actionText: {
        color: COLORS.white,
        fontSize: 13,
        fontFamily: 'NotoSans_400Regular',
        flex: 1,
    },
    textDimmed: {
        color: COLORS.gray500,
        fontStyle: 'italic',
    },
});
