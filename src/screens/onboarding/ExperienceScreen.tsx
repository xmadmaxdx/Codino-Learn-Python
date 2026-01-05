import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    StatusBar,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

// Colors
const COLORS = {
    primary: '#7f0df2',
    backgroundDark: '#191022',
    cardDark: '#261834',
    white: '#ffffff',
    gray400: '#9ca3af',
    whiteAlpha5: 'rgba(255, 255, 255, 0.05)',
    whiteAlpha10: 'rgba(255, 255, 255, 0.1)',
    primaryAlpha20: 'rgba(127, 13, 242, 0.2)',
};

interface ExperienceScreenProps {
    navigation: any;
}

const experienceLevels = [
    {
        id: 'novice',
        title: 'Novice',
        description: 'I am new to coding',
        icon: 'school',
    },
    {
        id: 'intermediate',
        title: 'Intermediate',
        description: 'I know the basics',
        icon: 'code',
    },
    {
        id: 'pro',
        title: 'Pro',
        description: 'I code for a living',
        icon: 'terminal',
    },
];

export const ExperienceScreen: React.FC<ExperienceScreenProps> = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

    const handleContinue = () => {
        if (selectedLevel) {
            // Navigate to Main App (Home) after onboarding
            navigation.reset({
                index: 0,
                routes: [{ name: 'MainTabs' }], // Assuming MainTabs is the entry point
            });
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

            {/* Pure Gradient Background - NO BLOBS */}
            <LinearGradient
                colors={[COLORS.backgroundDark, '#2a1b3d']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={StyleSheet.absoluteFill}
            />

            <ScrollView
                contentContainerStyle={[styles.content, { paddingTop: insets.top + 40, paddingBottom: 100 }]}
                showsVerticalScrollIndicator={false}
            >
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <MaterialIcons name="arrow-back" size={24} color={COLORS.white} />
                </TouchableOpacity>

                <View style={styles.header}>
                    <Text style={styles.title}>What's your experience?</Text>
                    <Text style={styles.subtitle}>
                        We'll tailor the learning path to match your current skills.
                    </Text>
                </View>

                <View style={styles.optionsContainer}>
                    {experienceLevels.map((level) => {
                        const isSelected = selectedLevel === level.id;
                        return (
                            <TouchableOpacity
                                key={level.id}
                                style={[
                                    styles.optionCard,
                                    isSelected && styles.optionCardSelected
                                ]}
                                onPress={() => setSelectedLevel(level.id)}
                                activeOpacity={0.9}
                            >
                                <View style={[
                                    styles.iconContainer,
                                    isSelected && styles.iconContainerSelected
                                ]}>
                                    <MaterialIcons
                                        name={level.icon as any}
                                        size={28}
                                        color={isSelected ? COLORS.primary : COLORS.white}
                                    />
                                </View>
                                <View style={styles.optionTextContainer}>
                                    <Text style={styles.optionTitle}>{level.title}</Text>
                                    <Text style={styles.optionDescription}>{level.description}</Text>
                                </View>
                                <View style={[
                                    styles.radioOuter,
                                    isSelected && styles.radioOuterSelected
                                ]}>
                                    {isSelected && <View style={styles.radioInner} />}
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </ScrollView>

            {/* Fixed Bottom Button */}
            <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 24) }]}>
                <TouchableOpacity
                    style={[styles.button, !selectedLevel && styles.buttonDisabled]}
                    disabled={!selectedLevel}
                    onPress={handleContinue}
                >
                    <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.backgroundDark,
    },
    content: {
        flexGrow: 1,
        paddingHorizontal: 24,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
        backgroundColor: COLORS.whiteAlpha5,
    },
    header: {
        marginBottom: 32,
        gap: 12,
    },
    title: {
        color: COLORS.white,
        fontSize: 28,
        fontFamily: 'SpaceGrotesk_700Bold',
    },
    subtitle: {
        color: COLORS.gray400,
        fontSize: 16,
        fontFamily: 'NotoSans_400Regular',
        lineHeight: 24,
    },
    optionsContainer: {
        gap: 16,
    },
    optionCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderRadius: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.08)',
    },
    optionCardSelected: {
        backgroundColor: 'rgba(127, 13, 242, 0.1)',
        borderColor: COLORS.primary,
    },
    iconContainer: {
        width: 56,
        height: 56,
        borderRadius: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    iconContainerSelected: {
        backgroundColor: COLORS.white,
    },
    optionTextContainer: {
        flex: 1,
    },
    optionTitle: {
        color: COLORS.white,
        fontSize: 18,
        fontFamily: 'SpaceGrotesk_700Bold',
        marginBottom: 4,
    },
    optionDescription: {
        color: COLORS.gray400,
        fontSize: 14,
        fontFamily: 'NotoSans_400Regular',
    },
    radioOuter: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: COLORS.gray400,
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioOuterSelected: {
        borderColor: COLORS.primary,
    },
    radioInner: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: COLORS.primary,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 24,
        paddingTop: 24,
        // Add background to ensure footer readability if content scrolls under
        backgroundColor: 'rgba(25, 16, 34, 0.9)',
    },
    button: {
        backgroundColor: COLORS.primary,
        height: 56,
        borderRadius: 9999,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 24,
        elevation: 8,
    },
    buttonDisabled: {
        backgroundColor: COLORS.cardDark,
        shadowOpacity: 0,
        elevation: 0,
    },
    buttonText: {
        color: COLORS.white,
        fontSize: 18,
        fontFamily: 'SpaceGrotesk_700Bold',
    },
});

export default ExperienceScreen;
