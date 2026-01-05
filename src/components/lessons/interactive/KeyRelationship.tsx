import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../../../constants/colors';
import { FormattedText } from '../FormattedText';

interface KeyRelationshipProps {
    concept: string;
    relatesTo: string;
    description: string;
    icon?: keyof typeof MaterialIcons.glyphMap;
    containerStyle?: ViewStyle;
}

/**
 * A component to show the relationship between two entities (e.g. Code vs Result).
 */
export const KeyRelationship: React.FC<KeyRelationshipProps> = ({
    concept,
    relatesTo,
    description,
    icon = 'link',
    containerStyle
}) => {
    return (
        <View style={[styles.outerContainer, containerStyle]}>
            <LinearGradient
                colors={['rgba(127, 13, 242, 0.1)', 'rgba(34, 197, 94, 0.1)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.container}
            >
                <View style={styles.topRow}>
                    <LinearGradient
                        colors={[COLORS.primary, COLORS.primaryDark]}
                        style={styles.conceptBox}
                    >
                        <Text style={styles.conceptLabel}>{concept}</Text>
                    </LinearGradient>

                    <View style={styles.connectorWrapper}>
                        <View style={styles.connectorLine} />
                        <View style={styles.connectorIconBg}>
                            <MaterialIcons name={icon} size={16} color={COLORS.white} />
                        </View>
                        <View style={styles.connectorLine} />
                    </View>

                    <LinearGradient
                        colors={[COLORS.green400, COLORS.green500]}
                        style={styles.conceptBox}
                    >
                        <Text style={styles.conceptLabel}>{relatesTo}</Text>
                    </LinearGradient>
                </View>

                <View style={styles.descriptionRow}>
                    <View style={styles.descIconWrapper}>
                        <MaterialIcons name="info-outline" size={14} color={COLORS.gray400} />
                    </View>
                    <FormattedText content={description} style={styles.descriptionText} />
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
    topRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    conceptBox: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        elevation: 4,
    },
    conceptLabel: {
        color: COLORS.white,
        fontFamily: 'SpaceGrotesk_700Bold',
        fontSize: 13,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    connectorWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        flex: 0.5,
    },
    connectorLine: {
        flex: 1,
        height: 2,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    connectorIconBg: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 4,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.15)',
    },
    descriptionRow: {
        flexDirection: 'row',
        gap: 12,
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        padding: 14,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    descIconWrapper: {
        paddingTop: 2,
    },
    descriptionText: {
        color: COLORS.gray400,
        fontSize: 13,
        fontFamily: 'NotoSans_400Regular',
        lineHeight: 20,
        flex: 1,
    },
});
