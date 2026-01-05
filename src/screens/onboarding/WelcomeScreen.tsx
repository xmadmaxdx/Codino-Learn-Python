import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    StatusBar,
    Image,
    TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

// Colors
const COLORS = {
    primary: '#7f0df2',
    backgroundDark: '#191022',
    white: '#ffffff',
    gray400: '#9ca3af',
    whiteAlpha10: 'rgba(255, 255, 255, 0.1)',
    whiteAlpha20: 'rgba(255, 255, 255, 0.2)',
    primaryAlpha20: 'rgba(127, 13, 242, 0.2)',
    emerald400: '#34d399',
};

interface WelcomeScreenProps {
    navigation: any;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
    const insets = useSafeAreaInsets();

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

            {/* Pure Gradient Background - NO BLOBS */}
            <LinearGradient
                colors={[COLORS.backgroundDark, '#2a1b3d']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={StyleSheet.absoluteFill}
                pointerEvents="none"
            />

            <View style={[styles.content, { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 20 }]}>
                {/* Main Illustration Section */}
                <View style={styles.heroSection}>
                    <View style={styles.imageContainer}>
                        {/* Decorative Floating Icons (Restored from Guide) */}
                        <View style={[styles.floatingIcon, styles.iconTopRight]}>
                            <MaterialIcons name="code" size={24} color={COLORS.primary} />
                        </View>
                        <View style={[styles.floatingIcon, styles.iconBottomLeft]}>
                            <MaterialIcons name="terminal" size={24} color={COLORS.emerald400} />
                        </View>

                        {/* Main Character Image (Restored from Guide) */}
                        <Image
                            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRl2njJp1n8T9rHUwm9-Qap8WPpy40R8wSTBspcxpn7cO7y1EZ_d0DUm-1xtwZuIUw9Y_sJ7GV0YKzF4oxM-MwFXCRdVO4Gv9AhFZob3c6vOEmaWvneUYWSfRCv4rxtEGK8_3aCtB_yEbV4xL1s3PZiamCxbWF8HHCQSSdhojyB3b4aU4053bGGn6wGLEc8GeH78hFhm1WYJVoSSR47EBMmMsh6AtwGPxEIUk6GfrHrvH3zOexfiZOpMZv899GeSYagXYnWSd6hx9b' }}
                            style={styles.mascotImage}
                            resizeMode="contain"
                        />
                    </View>
                </View>

                {/* Text & Actions */}
                <View style={styles.bottomSection}>
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>
                            Welcome to <Text style={styles.titleHighlight}>Codino</Text>
                        </Text>
                        <Text style={styles.subtitle}>
                            Master Python logic through bite-sized lessons and join a community of creators.
                        </Text>

                        {/* Carousel Indicators */}
                        <View style={styles.pagination}>
                            <View style={[styles.dot, styles.dotActive]} />
                            <View style={styles.dot} />
                            <View style={styles.dot} />
                        </View>
                    </View>

                    {/* Action Buttons */}
                    <View style={styles.actionContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            activeOpacity={0.9}
                            onPress={() => navigation.navigate('FeatureHighlight')}
                        >
                            <Text style={styles.buttonText}>Start Your Journey</Text>
                            <MaterialIcons name="arrow-forward" size={24} color={COLORS.white} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.loginLink}
                            onPress={() => navigation.navigate('Login')}
                        >
                            <Text style={styles.loginText}>I already have an account</Text>
                        </TouchableOpacity>
                    </View>
                </View>
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
        flex: 1,
        justifyContent: 'space-between',
        paddingHorizontal: 24,
    },
    heroSection: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        width: width * 0.85,
        height: width * 0.85,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    mascotImage: {
        width: '100%',
        height: '100%',
    },
    floatingIcon: {
        position: 'absolute',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 12,
        padding: 8,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        zIndex: 10,
    },
    iconTopRight: {
        top: 40,
        right: 20,
        transform: [{ rotate: '12deg' }],
    },
    iconBottomLeft: {
        bottom: 60,
        left: 10,
        transform: [{ rotate: '-6deg' }],
    },
    bottomSection: {
        gap: 32,
        paddingBottom: 24,
    },
    textContainer: {
        alignItems: 'center',
        gap: 16,
    },
    title: {
        color: COLORS.white,
        fontSize: 40,
        fontFamily: 'SpaceGrotesk_700Bold',
        textAlign: 'center',
        lineHeight: 48,
    },
    titleHighlight: {
        color: COLORS.primary,
    },
    subtitle: {
        color: COLORS.gray400,
        fontSize: 18,
        fontFamily: 'NotoSans_400Regular',
        textAlign: 'center',
        lineHeight: 26,
        maxWidth: 320,
    },
    pagination: {
        flexDirection: 'row',
        gap: 8,
        marginTop: 8,
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: COLORS.whiteAlpha20, // Corrected from guide
    },
    dotActive: {
        width: 24,
        backgroundColor: COLORS.primary,
    },
    actionContainer: {
        width: '100%',
        gap: 16,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        backgroundColor: COLORS.primary,
        height: 56,
        borderRadius: 9999,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 24,
        elevation: 8,
    },
    buttonText: {
        color: COLORS.white,
        fontSize: 18,
        fontFamily: 'SpaceGrotesk_700Bold',
        letterSpacing: 0.5,
    },
    loginLink: {
        alignItems: 'center',
        paddingVertical: 8,
    },
    loginText: {
        color: 'rgba(255, 255, 255, 0.5)',
        fontSize: 14,
        fontFamily: 'SpaceGrotesk_600SemiBold',
    },
});

export default WelcomeScreen;
