import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../../../constants/colors';

interface ValueItem {
    variable: string;
    value: string;
    type: string;
    valueColor?: 'green' | 'orange' | 'blue' | 'purple' | 'default';
}

interface ValueExchangePanelProps {
    title?: string;
    items: ValueItem[];
    containerStyle?: ViewStyle;
}

export const ValueExchangePanel: React.FC<ValueExchangePanelProps> = ({
    title = 'Data Storage',
    items,
    containerStyle
}) => {

    const getValueColors = (colorType?: string): readonly [string, string] => {
        switch (colorType) {
            case 'green': return ['rgba(74, 222, 128, 0.2)', 'rgba(74, 222, 128, 0.1)'];
            case 'orange': return ['rgba(251, 146, 60, 0.2)', 'rgba(251, 146, 60, 0.1)'];
            case 'blue': return ['rgba(96, 165, 250, 0.2)', 'rgba(96, 165, 250, 0.1)'];
            case 'purple': return ['rgba(192, 132, 252, 0.2)', 'rgba(192, 132, 252, 0.1)'];
            default: return ['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)'];
        }
    };

    const getPrimaryColor = (colorType?: string) => {
        switch (colorType) {
            case 'green': return COLORS.green400;
            case 'orange': return COLORS.orange400;
            case 'blue': return COLORS.blue400;
            case 'purple': return '#c084fc';
            default: return COLORS.white;
        }
    };

    return (
        <View style={[styles.outerContainer, containerStyle]}>
            <LinearGradient
                colors={['rgba(127, 13, 242, 0.1)', 'rgba(127, 13, 242, 0.02)']}
                style={styles.container}
            >
                <View style={styles.header}>
                    <View style={styles.headerIconWrapper}>
                        <MaterialIcons name="storage" size={16} color={COLORS.primaryLight} />
                    </View>
                    <Text style={styles.title}>{title}</Text>
                </View>

                <View style={styles.list}>
                    {items.map((item, index) => (
                        <View key={index} style={styles.row}>
                            <View style={styles.variableContainer}>
                                <Text style={styles.variableText}>{item.variable}</Text>
                                <Text style={styles.typeLabel}>{item.type}</Text>
                            </View>

                            <View style={styles.connector}>
                                <View style={styles.connectorLine} />
                                <MaterialIcons name="chevron-right" size={16} color={COLORS.gray500} />
                            </View>

                            <LinearGradient
                                colors={getValueColors(item.valueColor)}
                                style={[
                                    styles.valueCard,
                                    { borderColor: `${getPrimaryColor(item.valueColor)}40` }
                                ]}
                            >
                                <Text style={[
                                    styles.valueText,
                                    { color: getPrimaryColor(item.valueColor) }
                                ]}>
                                    {item.value}
                                </Text>
                            </LinearGradient>
                        </View>
                    ))}
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
        marginBottom: 24,
    },
    headerIconWrapper: {
        width: 32,
        height: 32,
        borderRadius: 10,
        backgroundColor: 'rgba(127, 13, 242, 0.15)',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(127, 13, 242, 0.2)',
    },
    title: {
        color: COLORS.white,
        fontSize: 13,
        fontFamily: 'SpaceGrotesk_700Bold',
        letterSpacing: 2,
        textTransform: 'uppercase',
        opacity: 0.9,
    },
    list: {
        gap: 16,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    variableContainer: {
        flex: 1,
    },
    variableText: {
        color: '#d8b4fe',
        fontSize: 16,
        fontFamily: 'SpaceGrotesk_700Bold',
    },
    typeLabel: {
        color: COLORS.gray500,
        fontSize: 11,
        fontFamily: 'NotoSans_400Regular',
        textTransform: 'uppercase',
        marginTop: 2,
        letterSpacing: 0.5,
    },
    connector: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        opacity: 0.4,
    },
    connectorLine: {
        width: 20,
        height: 1,
        backgroundColor: COLORS.gray500,
    },
    valueCard: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 12,
        borderWidth: 1,
        minWidth: 80,
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
    },
    valueText: {
        fontSize: 14,
        fontFamily: 'monospace',
        fontWeight: '700',
    },
});
