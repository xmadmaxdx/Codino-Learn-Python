import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../../../constants/colors';
import { FormattedText } from '../FormattedText';

interface HiddenBehaviorRevealProps {
    teaser: string;
    revealedContent: string;
    title?: string;
    containerStyle?: ViewStyle;
}

export const HiddenBehaviorReveal: React.FC<HiddenBehaviorRevealProps> = ({
    teaser,
    revealedContent,
    title = 'Pro Insight',
    containerStyle
}) => {
    const [isRevealed, setIsRevealed] = useState(false);

    return (
        <View style={[styles.outerContainer, containerStyle]}>
            <LinearGradient
                colors={['rgba(168, 85, 247, 0.1)', 'rgba(168, 85, 247, 0.02)']}
                style={styles.container}
            >
                <View style={styles.header}>
                    <View style={styles.headerIconWrapper}>
                        <MaterialIcons name="auto-awesome" size={16} color={COLORS.primaryLight} />
                    </View>
                    <Text style={styles.title}>{title}</Text>
                </View>

                <View style={styles.content}>
                    {teaser ? <FormattedText content={teaser} style={styles.teaserText} /> : null}

                    {!isRevealed ? (
                        <TouchableOpacity
                            onPress={() => setIsRevealed(true)}
                            activeOpacity={0.8}
                            style={styles.revealButtonContainer}
                        >
                            <LinearGradient
                                colors={[COLORS.primary, COLORS.primaryDark]}
                                style={styles.revealButton}
                            >
                                <MaterialIcons name="visibility" size={18} color={COLORS.white} />
                                <Text style={styles.revealButtonText}>Explore Hidden Logic</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    ) : (
                        <View style={styles.revealedWrapper}>
                            <LinearGradient
                                colors={['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.01)']}
                                style={StyleSheet.absoluteFill}
                            />
                            <FormattedText
                                content={revealedContent}
                                style={styles.revealedText}
                            />
                        </View>
                    )}
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
        marginBottom: 20,
    },
    headerIconWrapper: {
        width: 32,
        height: 32,
        borderRadius: 10,
        backgroundColor: 'rgba(157, 77, 255, 0.15)',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(157, 77, 255, 0.2)',
    },
    title: {
        color: COLORS.primaryLight,
        fontSize: 13,
        fontFamily: 'SpaceGrotesk_700Bold',
        letterSpacing: 2,
        textTransform: 'uppercase',
    },
    content: {
        gap: 16,
    },
    teaserText: {
        color: COLORS.gray300,
        fontSize: 15,
        fontFamily: 'NotoSans_400Regular',
        lineHeight: 24,
    },
    revealButtonContainer: {
        borderRadius: 16,
        elevation: 8,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
    },
    revealButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        paddingVertical: 16,
        borderRadius: 16,
    },
    revealButtonText: {
        color: COLORS.white,
        fontFamily: 'SpaceGrotesk_700Bold',
        fontSize: 15,
        letterSpacing: 0.5,
    },
    revealedWrapper: {
        borderRadius: 20,
        padding: 20,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        overflow: 'hidden',
        marginTop: 4,
    },
    revealedText: {
        color: COLORS.whiteAlpha90,
        fontSize: 15,
        fontFamily: 'NotoSans_400Regular',
        lineHeight: 26,
    },
});
