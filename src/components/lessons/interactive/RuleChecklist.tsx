import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../../../constants/colors';
import { FormattedText } from '../FormattedText';

interface RuleItem {
    text: string;
    isValid: boolean;
    color?: string; // Optional custom color for the dot
}

interface RuleChecklistProps {
    rules: RuleItem[];
    title?: string;
    containerStyle?: ViewStyle;
}

export const RuleChecklist: React.FC<RuleChecklistProps> = ({
    rules,
    title = 'Logic Checklist',
    containerStyle
}) => {
    return (
        <View style={[styles.outerContainer, containerStyle]}>
            <LinearGradient
                colors={['rgba(34, 197, 94, 0.05)', 'rgba(34, 197, 94, 0.02)']}
                style={styles.container}
            >
                <View style={styles.header}>
                    <View style={styles.headerIconWrapper}>
                        <MaterialIcons name="fact-check" size={16} color={COLORS.green400} />
                    </View>
                    <Text style={styles.title}>{title}</Text>
                </View>

                <View style={styles.list}>
                    {rules.map((rule, index) => {
                        const dotColor = rule.color || (rule.isValid ? COLORS.green400 : COLORS.gray500);

                        return (
                            <View key={index} style={styles.ruleItem}>
                                <View style={styles.dotContainer}>
                                    <View style={[
                                        styles.dot,
                                        { backgroundColor: dotColor, shadowColor: dotColor },
                                        !rule.isValid && styles.dotInactive
                                    ]} />
                                </View>
                                <FormattedText
                                    content={rule.text}
                                    style={[styles.ruleText, !rule.isValid && styles.textDimmed]}
                                />
                            </View>
                        );
                    })}
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
        marginBottom: 20,
    },
    headerIconWrapper: {
        width: 32,
        height: 32,
        borderRadius: 10,
        backgroundColor: 'rgba(34, 197, 94, 0.15)',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(34, 197, 94, 0.2)',
    },
    title: {
        color: COLORS.green400,
        fontSize: 13,
        fontFamily: 'SpaceGrotesk_700Bold',
        letterSpacing: 2,
        textTransform: 'uppercase',
    },
    list: {
        gap: 14,
    },
    ruleItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 12,
    },
    dotContainer: {
        paddingTop: 6,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        elevation: 4,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
    },
    dotInactive: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        shadowOpacity: 0,
    },
    ruleText: {
        color: COLORS.white,
        fontSize: 14,
        fontFamily: 'NotoSans_400Regular',
        lineHeight: 20,
        flex: 1,
    },
    textDimmed: {
        color: COLORS.gray500,
        textDecorationLine: 'line-through',
    },
});
