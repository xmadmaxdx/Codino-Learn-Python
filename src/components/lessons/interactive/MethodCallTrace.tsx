import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../../../constants/colors';

interface MethodStep {
    objectName: string;
    methodName: string;
    params?: string;
    description: string;
    isReturn?: boolean;
}

interface MethodCallTraceProps {
    steps: MethodStep[];
    containerStyle?: ViewStyle;
}

export const MethodCallTrace: React.FC<MethodCallTraceProps> = ({
    steps,
    containerStyle
}) => {
    return (
        <View style={[styles.container, containerStyle]}>
            <View style={styles.header}>
                <MaterialIcons name="segment" size={20} color={COLORS.primaryLight} />
                <Text style={styles.title}>Method Trace</Text>
            </View>

            <View style={styles.traceContainer}>
                {steps.map((step, index) => (
                    <View key={index} style={styles.stepContainer}>
                        {/* Connecting Line (except for last) */}
                        {index !== steps.length - 1 && <View style={styles.line} />}

                        <View style={styles.stepContent}>
                            <View style={[
                                styles.iconBox,
                                step.isReturn ? styles.iconReturrn : styles.iconCall
                            ]}>
                                <MaterialIcons
                                    name={step.isReturn ? 'keyboard-return' : 'play-arrow'}
                                    size={16}
                                    color={COLORS.white}
                                />
                            </View>

                            <View style={styles.details}>
                                <View style={styles.codeRow}>
                                    <Text style={styles.objectName}>{step.objectName}</Text>
                                    <Text style={styles.dot}>.</Text>
                                    <Text style={styles.methodName}>{step.methodName}</Text>
                                    <Text style={styles.params}>({step.params || ''})</Text>
                                </View>
                                <Text style={styles.description}>{step.description}</Text>
                            </View>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.cardDark,
        borderRadius: 16,
        padding: 20,
        borderWidth: 1,
        borderColor: COLORS.whiteAlpha5,
        marginVertical: 12,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 20,
    },
    title: {
        color: COLORS.primaryLight,
        fontSize: 14,
        fontFamily: 'SpaceGrotesk_700Bold',
        letterSpacing: 0.5,
        textTransform: 'uppercase',
    },
    traceContainer: {
        paddingLeft: 8,
    },
    stepContainer: {
        position: 'relative',
        marginBottom: 24,
    },
    line: {
        position: 'absolute',
        left: 14,
        top: 28,
        bottom: -24,
        width: 2,
        backgroundColor: COLORS.whiteAlpha10,
    },
    stepContent: {
        flexDirection: 'row',
        gap: 16,
    },
    iconBox: {
        width: 30,
        height: 30,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
        borderWidth: 2,
        borderColor: COLORS.cardDark,
    },
    iconCall: {
        backgroundColor: COLORS.primary,
    },
    iconReturrn: {
        backgroundColor: COLORS.green400,
    },
    details: {
        flex: 1,
        paddingTop: 4,
    },
    codeRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        marginBottom: 4,
    },
    objectName: {
        color: COLORS.yellow400,
        fontFamily: 'monospace',
        fontWeight: 'bold',
        fontSize: 14,
    },
    dot: {
        color: COLORS.gray500,
        fontFamily: 'monospace',
        fontSize: 14,
    },
    methodName: {
        color: COLORS.blue400, // Assuming blue for methods in theme
        fontFamily: 'monospace',
        fontWeight: 'bold',
        fontSize: 14,
    },
    params: {
        color: COLORS.gray400,
        fontFamily: 'monospace',
        fontSize: 14,
    },
    description: {
        color: COLORS.gray500,
        fontSize: 12,
        fontStyle: 'italic',
    },
});

// Adding local blue400 if not global
const COLORS_EXT = { ...COLORS, blue400: '#60a5fa' };
