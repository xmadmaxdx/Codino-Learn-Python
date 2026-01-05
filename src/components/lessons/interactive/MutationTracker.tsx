import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../../../constants/colors';

interface MutationTrackerProps {
    before: string; // JSON string or representation
    after: string;
    operation: string; // e.g., "list.append(5)"
    containerStyle?: ViewStyle;
}

export const MutationTracker: React.FC<MutationTrackerProps> = ({
    before,
    after,
    operation,
    containerStyle
}) => {
    return (
        <View style={[styles.container, containerStyle]}>
            <View style={styles.header}>
                <MaterialIcons name="change-circle" size={20} color={COLORS.red400} />
                <Text style={styles.title}>Mutation Tracker</Text>
            </View>

            <View style={styles.mutationArea}>
                {/* Before State */}
                <View style={styles.stateBlock}>
                    <Text style={styles.label}>Before</Text>
                    <View style={styles.valueContainer}>
                        <Text style={styles.codeText}>{before}</Text>
                    </View>
                </View>

                {/* Operation Arrow */}
                <View style={styles.operationBlock}>
                    <Text style={styles.opText}>{operation}</Text>
                    <MaterialIcons name="arrow-downward" size={24} color={COLORS.primary} />
                </View>

                {/* After State */}
                <View style={styles.stateBlock}>
                    <Text style={styles.label}>After</Text>
                    <View style={[styles.valueContainer, styles.afterValue]}>
                        <Text style={[styles.codeText, styles.highlightText]}>{after}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.footer}>
                <MaterialIcons name="info-outline" size={14} color={COLORS.gray500} />
                <Text style={styles.note}>Original object ID remains the same.</Text>
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
        color: COLORS.red400,
        fontSize: 14,
        fontFamily: 'SpaceGrotesk_700Bold',
        letterSpacing: 0.5,
        textTransform: 'uppercase',
    },
    mutationArea: {
        alignItems: 'center',
        gap: 12,
    },
    stateBlock: {
        width: '100%',
        alignItems: 'center',
    },
    label: {
        color: COLORS.gray500,
        fontSize: 10,
        textTransform: 'uppercase',
        marginBottom: 6,
        fontFamily: 'SpaceGrotesk_700Bold',
    },
    valueContainer: {
        backgroundColor: COLORS.backgroundDark,
        width: '100%',
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: COLORS.whiteAlpha10,
        alignItems: 'center',
    },
    afterValue: {
        borderColor: COLORS.primaryAlpha50,
        backgroundColor: 'rgba(127, 13, 242, 0.05)',
    },
    codeText: {
        color: COLORS.gray300,
        fontFamily: 'monospace',
        fontSize: 14,
    },
    highlightText: {
        color: COLORS.white,
        fontWeight: 'bold',
    },
    operationBlock: {
        alignItems: 'center',
        gap: 4,
    },
    opText: {
        color: COLORS.primaryLight,
        fontFamily: 'monospace',
        fontSize: 12,
        backgroundColor: COLORS.whiteAlpha5,
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
    },
    footer: {
        marginTop: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
    },
    note: {
        color: COLORS.gray500,
        fontSize: 11,
        fontFamily: 'NotoSans_400Regular',
    },
});
