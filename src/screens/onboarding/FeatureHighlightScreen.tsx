import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    StatusBar,
    Image,
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
    white: '#ffffff',
    gray400: '#9ca3af',
    whiteAlpha5: 'rgba(255, 255, 255, 0.05)',
    whiteAlpha10: 'rgba(255, 255, 255, 0.1)',
    whiteAlpha20: 'rgba(255, 255, 255, 0.2)',
    primaryAlpha20: 'rgba(127, 13, 242, 0.2)',
    green400: '#4ade80',
};

interface FeatureHighlightScreenProps {
    navigation: any;
}

export const FeatureHighlightScreen: React.FC<FeatureHighlightScreenProps> = ({ navigation }) => {
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

            <ScrollView
                contentContainerStyle={[styles.content, { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 20 }]}
                showsVerticalScrollIndicator={false}
            >
                {/* Header - Skip Button */}
                <View style={styles.header}>
                    <View style={styles.logoMark}>
                        <MaterialIcons name="terminal" size={24} color={COLORS.primary} />
                    </View>
                    <TouchableOpacity
                        style={styles.skipButton}
                        onPress={() => navigation.navigate('Experience')}
                    >
                        <Text style={styles.skipText}>Skip</Text>
                    </TouchableOpacity>
                </View>

                {/* Hero Illustration Container */}
                <View style={styles.heroSection}>
                    <View style={styles.imageContainer}>
                        {/* Decorative Floating Icons (Restored from Guide) */}
                        <View style={[styles.floatingIcon, styles.iconTopRight]}>
                            <MaterialIcons name="check-circle" size={24} color={COLORS.green400} />
                        </View>
                        <View style={[styles.floatingIcon, styles.iconBottomLeft]}>
                            <MaterialIcons name="code" size={24} color={COLORS.primary} />
                        </View>

                        {/* Main Image (Restored from Guide) */}
                        <Image
                            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDz8JfsCzK5qJcYhxIUxuD2U9YqO-SBYw9RjXa6jhd0QFYyfAdqvjLPwzoq7_xkfYjYx46d6g2vO1iAR7mvNKr6ztfy56nKbiDQjNORmEUSe20cbSSiGoG3Ngo_KJ8jtJF0LFNp0RZk6TzrPchspXmXs6vlBjdyiZ-SppCbwRa46umO3EdIT5mUg0whhuHR32TpxBloC0aoym-mho8Wbg5cv7QkHzXVdeS_7GyRJgCfkB4bDHjj5Voxz95APAU0yxIAX8WCtRIJdMLM' }}
                            style={styles.heroImage}
                            resizeMode="contain"
                        />
                    </View>
                </View>

                {/* Text Content */}
                <View style={styles.textSection}>
                    <Text style={styles.title}>
                        Your Path <Text style={styles.titleHighlight}>to Pro</Text>
                    </Text>
                    <Text style={styles.subtitle}>
                        No more confusion. Our curated curriculum guides you from your first line of code to building real apps.
                    </Text>
                </View>

                {/* Footer Actions */}
                <View style={styles.footerSection}>
                    {/* Page Indicators */}
                    <View style={styles.pagination}>
                        <View style={styles.dot} />
                        <View style={[styles.dot, styles.dotActive]} />
                        <View style={styles.dot} />
                    </View>

                    {/* Action Button */}
                    <TouchableOpacity
                        style={styles.button}
                        activeOpacity={0.9}
                        onPress={() => navigation.navigate('Experience')}
                    >
                        <Text style={styles.buttonText}>Continue</Text>
                        <MaterialIcons name="arrow-forward" size={24} color={COLORS.white} />
                    </TouchableOpacity>
                </View>
            </ScrollView>
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
        justifyContent: 'space-between',
        paddingHorizontal: 24,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    logoMark: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    skipButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 9999,
    },
    skipText: {
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: 14,
        fontFamily: 'SpaceGrotesk_700Bold',
    },
    heroSection: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    },
    imageContainer: {
        width: width * 0.85,
        height: width * 0.85,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    heroImage: {
        width: '100%',
        height: '100%',
    },
    floatingIcon: {
        position: 'absolute',
        backgroundColor: '#2a1e36',
        borderRadius: 12,
        padding: 8,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        zIndex: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    iconTopRight: {
        top: 40,
        right: 0,
        transform: [{ rotate: '12deg' }],
    },
    iconBottomLeft: {
        bottom: 40,
        left: 16,
        transform: [{ rotate: '-6deg' }],
    },
    textSection: {
        alignItems: 'center',
        gap: 16,
        marginBottom: 32,
    },
    title: {
        color: COLORS.white,
        fontSize: 36,
        fontFamily: 'SpaceGrotesk_700Bold',
        textAlign: 'center',
        lineHeight: 44,
    },
    titleHighlight: {
        color: COLORS.primary, // Using primary color instead of gradient text for compatibility
    },
    subtitle: {
        color: COLORS.gray400,
        fontSize: 16,
        fontFamily: 'NotoSans_400Regular',
        textAlign: 'center',
        lineHeight: 24,
        maxWidth: 320,
    },
    footerSection: {
        width: '100%',
        alignItems: 'center',
        gap: 32,
    },
    pagination: {
        flexDirection: 'row',
        gap: 12,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: COLORS.whiteAlpha20,
    },
    dotActive: {
        width: 32,
        backgroundColor: COLORS.primary,
    },
    button: {
        width: '100%',
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
});

export default FeatureHighlightScreen;
