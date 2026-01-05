import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../../../constants/colors';

interface InputOutputBridgeProps {
    inputValue: string;
    functionName: string;
    outputValue: string;
    title?: string;
    inputType?: string;
    outputType?: string;
    containerStyle?: ViewStyle;
}

export const InputOutputBridge: React.FC<InputOutputBridgeProps> = ({
    inputValue,
    functionName,
    outputValue,
    title = 'Data Transformation',
    inputType,
    outputType,
    containerStyle
}) => {
    return (
        <View style={[styles.outerContainer, containerStyle]}>
            <LinearGradient
                colors={['rgba(249, 115, 22, 0.1)', 'rgba(249, 115, 22, 0.02)']}
                style={styles.container}
            >
                <View style={styles.header}>
                    <View style={styles.headerIconWrapper}>
                        <MaterialIcons name="transform" size={16} color={COLORS.orange400} />
                    </View>
                    <Text style={styles.title}>{title}</Text>
                </View>

                <View style={styles.bridgeContainer}>
                    {/* Input Side */}
                    <View style={styles.block}>
                        <Text style={styles.label}>Input Source</Text>
                        <LinearGradient
                            colors={['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)']}
                            style={styles.valueCard}
                        >
                            <Text style={styles.valueText}>{inputValue}</Text>
                        </LinearGradient>
                        {inputType && <Text style={styles.typeLabel}>{inputType}</Text>}
                    </View>

                    {/* Engine / Function */}
                    <View style={styles.engineSection}>
                        <View style={styles.flowLineLeft} />
                        <LinearGradient
                            colors={[COLORS.primary, COLORS.primaryDark]}
                            style={styles.engineBox}
                        >
                            <View style={styles.engineInner}>
                                <MaterialIcons name="functions" size={20} color={COLORS.white} />
                                <Text style={styles.engineText}>{functionName}()</Text>
                            </View>
                        </LinearGradient>
                        <View style={styles.flowLineRight}>
                            <MaterialIcons name="chevron-right" size={20} color={COLORS.primaryLight} />
                        </View>
                    </View>

                    {/* Output Side */}
                    <View style={styles.block}>
                        <Text style={styles.label}>Processed Result</Text>
                        <LinearGradient
                            colors={['rgba(34, 197, 94, 0.2)', 'rgba(34, 197, 94, 0.1)']}
                            style={[styles.valueCard, styles.outputCard]}
                        >
                            <Text style={[styles.valueText, styles.outputText]}>{outputValue}</Text>
                        </LinearGradient>
                        {outputType && <Text style={styles.typeLabel}>{outputType}</Text>}
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
        backgroundColor: 'rgba(249, 115, 22, 0.15)',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(249, 115, 22, 0.2)',
    },
    title: {
        color: COLORS.orange400,
        fontSize: 13,
        fontFamily: 'SpaceGrotesk_700Bold',
        letterSpacing: 2,
        textTransform: 'uppercase',
    },
    bridgeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    block: {
        alignItems: 'center',
        flex: 1,
    },
    label: {
        color: COLORS.gray500,
        fontSize: 10,
        textTransform: 'uppercase',
        marginBottom: 8,
        fontFamily: 'SpaceGrotesk_700Bold',
        letterSpacing: 0.5,
    },
    valueCard: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        minWidth: 70,
        alignItems: 'center',
    },
    outputCard: {
        borderColor: 'rgba(34, 197, 94, 0.3)',
    },
    valueText: {
        color: COLORS.white,
        fontFamily: 'monospace',
        fontSize: 14,
        fontWeight: '700',
    },
    outputText: {
        color: COLORS.green400,
    },
    typeLabel: {
        color: COLORS.gray500,
        fontSize: 10,
        marginTop: 6,
        fontStyle: 'italic',
        fontFamily: 'NotoSans_400Regular',
    },
    engineSection: {
        flex: 1.2,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    engineBox: {
        borderRadius: 16,
        padding: 1, // Border effect
        elevation: 6,
        shadowColor: COLORS.primary,
        shadowOpacity: 0.4,
        shadowRadius: 12,
    },
    engineInner: {
        backgroundColor: COLORS.cardDark,
        borderRadius: 15,
        paddingHorizontal: 12,
        paddingVertical: 8,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    engineText: {
        color: COLORS.white,
        fontFamily: 'monospace',
        fontSize: 12,
        fontWeight: 'bold',
    },
    flowLineLeft: {
        width: 15,
        height: 2,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    flowLineRight: {
        width: 25,
        height: 2,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
});
