import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../../../constants/colors';

type StopType = 'break' | 'continue' | 'return' | 'raise' | 'yield';

interface FlowStopIndicatorProps {
    type: StopType;
    message?: string;
    condition?: string;
    title?: string;
    containerStyle?: ViewStyle;
}

export const FlowStopIndicator: React.FC<FlowStopIndicatorProps> = ({
    type,
    message,
    condition,
    title,
    containerStyle
}) => {

    const getConfig = () => {
        switch (type) {
            case 'break':
                return {
                    icon: 'cancel',
                    color: COLORS.red400,
                    label: 'BREAK',
                    desc: 'Exits the loop immediately.'
                };
            case 'continue':
                return {
                    icon: 'fast-forward',
                    color: COLORS.orange400,
                    label: 'CONTINUE',
                    desc: 'Skips to next iteration.'
                };
            case 'return':
                return {
                    icon: 'keyboard-return',
                    color: COLORS.green400,
                    label: 'RETURN',
                    desc: 'Exits function with a value.'
                };
            case 'raise':
                return {
                    icon: 'warning',
                    color: COLORS.red400,
                    label: 'RAISE',
                    desc: 'Stops execution, signals error.'
                };
            case 'yield':
                return {
                    icon: 'pause-circle-filled',
                    color: COLORS.yellow400,
                    label: 'YIELD',
                    desc: 'Pauses function, saves state.'
                };
            default:
                return {
                    icon: 'stop',
                    color: COLORS.gray400,
                    label: 'STOP',
                    desc: 'Stops execution.'
                };
        }
    };

    const config = getConfig();

    return (
        <View style={[styles.container, containerStyle]}>
            {title && (
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>{title}</Text>
                </View>
            )}
            <View style={styles.content}>
                {/* Traffic Light Visual */}
                <View style={[styles.iconBox, { backgroundColor: `${config.color}20` }]}>
                    <MaterialIcons name={config.icon as any} size={32} color={config.color} />
                </View>

                <View style={styles.textContainer}>
                    <Text style={[styles.label, { color: config.color }]}>{config.label}</Text>
                    {condition && (
                        <View style={styles.conditionBox}>
                            <Text style={styles.conditionText}>IF {condition}</Text>
                        </View>
                    )}
                    <Text style={styles.message}>{message || config.desc}</Text>
                </View>
            </View>

            <View style={[styles.stripe, { backgroundColor: config.color }]} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.cardDark,
        borderRadius: 12,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: COLORS.whiteAlpha5,
        marginVertical: 12,
    },
    header: {
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.whiteAlpha5,
    },
    headerTitle: {
        color: COLORS.gray300,
        fontSize: 12,
        fontFamily: 'SpaceGrotesk_700Bold',
        letterSpacing: 0.5,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        gap: 16,
    },
    iconBox: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: COLORS.whiteAlpha10,
    },
    textContainer: {
        flex: 1,
    },
    label: {
        fontSize: 16,
        fontFamily: 'SpaceGrotesk_700Bold',
        marginBottom: 4,
        letterSpacing: 1,
    },
    conditionBox: {
        backgroundColor: COLORS.backgroundDark,
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
        alignSelf: 'flex-start',
        marginBottom: 4,
    },
    conditionText: {
        color: COLORS.primaryLight,
        fontFamily: 'monospace',
        fontSize: 11,
        fontWeight: 'bold',
    },
    message: {
        color: COLORS.gray400,
        fontSize: 14,
        fontFamily: 'NotoSans_400Regular',
    },
    stripe: {
        height: 4,
        width: '100%',
        opacity: 0.5,
    },
});
