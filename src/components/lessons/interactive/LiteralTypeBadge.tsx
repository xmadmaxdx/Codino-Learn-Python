import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../../../constants/colors';

interface LiteralTypeBadgeProps {
    value: string;
    type: 'string' | 'int' | 'float' | 'bool' | 'list' | 'dict' | 'none';
    label?: string; // Optional custom label if different from type name
    containerStyle?: ViewStyle;
}

export const LiteralTypeBadge: React.FC<LiteralTypeBadgeProps> = ({
    value,
    type,
    label,
    containerStyle
}) => {

    const getTypeConfig = () => {
        switch (type) {
            case 'string':
                return { color: COLORS.orange400, icon: 'text-fields' };
            case 'int':
                return { color: COLORS.green400, icon: 'numbers' };
            case 'float':
                return { color: COLORS.blue400, icon: 'decimal-increase' }; // approximation
            case 'bool':
                return { color: COLORS.primaryLight, icon: 'toggle-on' };
            case 'list':
                return { color: COLORS.yellow400, icon: 'list' };
            case 'dict':
                return { color: COLORS.red400, icon: 'data-object' };
            case 'none':
                return { color: COLORS.gray500, icon: 'block' };
            default:
                return { color: COLORS.gray400, icon: 'help-outline' };
        }
    };

    const config = getTypeConfig();
    const typeLabel = label || type;

    return (
        <View style={[styles.container, containerStyle]}>
            <View style={styles.valueSection}>
                <Text style={styles.valueText}>{value}</Text>
            </View>

            <View style={styles.arrowSection}>
                <MaterialIcons name="arrow-right-alt" size={24} color={COLORS.gray500} />
            </View>

            <View style={[styles.badgeSection, { borderColor: config.color, backgroundColor: `${config.color}15` }]}>
                <Text style={[styles.typeText, { color: config.color }]}>{typeLabel}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.cardDark,
        padding: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.whiteAlpha5,
        alignSelf: 'flex-start', // Fit output
        marginVertical: 4,
    },
    valueSection: {
        backgroundColor: COLORS.backgroundDark,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: COLORS.whiteAlpha10,
    },
    valueText: {
        color: COLORS.white,
        fontFamily: 'monospace',
        fontSize: 14,
        fontWeight: '500',
    },
    arrowSection: {
        paddingHorizontal: 8,
    },
    badgeSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 20,
        borderWidth: 1,
    },
    typeText: {
        fontSize: 12,
        fontFamily: 'SpaceGrotesk_700Bold',
        letterSpacing: 0.5,
        textTransform: 'lowercase',
    },
});
