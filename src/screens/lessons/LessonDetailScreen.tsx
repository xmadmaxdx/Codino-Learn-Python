import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    ScrollView,
    TouchableOpacity,
    Platform,
    Image
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { getLessonContent } from '../../data/content';
import * as InteractiveComponents from '../../components/lessons/interactive';
import { FormattedText } from '../../components/lessons/FormattedText';
import { COLORS } from '../../constants/colors';

interface LessonDetailScreenProps {
    navigation: any;
    route: any;
}

export const LessonDetailScreen: React.FC<LessonDetailScreenProps> = ({ navigation, route }) => {
    const insets = useSafeAreaInsets();
    const { lessonId, unitId } = route.params || {};

    // Fetch content based on ID
    const content = getLessonContent(lessonId);

    // Render a specific block based on its type
    const renderBlock = (block: any) => {
        switch (block.type) {
            case 'text':
                return (
                    <FormattedText key={block.id} content={block.content} style={styles.paragraph} />
                );

            case 'code':
                return (
                    <InteractiveComponents.CodeBlock
                        key={block.id}
                        code={block.content}
                        language={block.language || 'python'}
                        containerStyle={styles.componentContainer}
                    />
                );

            case 'component':
                const Component = (InteractiveComponents as any)[block.componentType];
                if (!Component) return null;
                return (
                    <Component
                        key={block.id}
                        {...block.props}
                        containerStyle={styles.componentContainer}
                    />
                );

            case 'glow_item':
                const GlowComponent = (InteractiveComponents as any)[block.componentType];
                if (!GlowComponent) return null;
                return (
                    <InteractiveComponents.PremiumGlowWrapper key={block.id} color={block.glowColor}>
                        <GlowComponent
                            {...block.props}
                            containerStyle={styles.componentContainer}
                        />
                    </InteractiveComponents.PremiumGlowWrapper>
                );

            case 'callout':
                return (
                    <View key={block.id} style={styles.proTipContainer}>
                        <LinearGradient
                            colors={[COLORS.primary, '#c084fc', COLORS.primary]}
                            start={{ x: 0, y: 0.5 }}
                            end={{ x: 1, y: 0.5 }}
                            style={styles.proTipBorder}
                        >
                            <View style={styles.proTipCard}>
                                <View style={styles.proTipHeader}>
                                    <MaterialIcons name="lightbulb" size={20} color={COLORS.yellow400} />
                                    <Text style={styles.proTipTitle}>{block.title || 'NOTE'}</Text>
                                </View>
                                <FormattedText content={block.content} style={styles.proTipText} />
                            </View>
                        </LinearGradient>
                    </View>
                );
            // Add other types as needed
            default:
                return null;
        }
    };

    if (!content) {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
                <LinearGradient
                    colors={[COLORS.backgroundDark, '#2a1b3d']}
                    style={StyleSheet.absoluteFill}
                />
                <View style={styles.centerContent}>
                    <Text style={styles.errorText}>Lesson Content Not Found</Text>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Text style={styles.backButtonText}>Go Back</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

            {/* Pure Gradient Background */}
            <LinearGradient
                colors={[COLORS.backgroundDark, '#2a1b3d']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={StyleSheet.absoluteFill}
                pointerEvents="none"
            />

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={[
                    styles.scrollContent,
                    { paddingTop: insets.top, paddingBottom: 120 }
                ]}
                showsVerticalScrollIndicator={false}
                bounces={true}
            >
                {/* Header Actions */}
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.headerButton}
                        onPress={() => navigation.goBack()}
                    >
                        <MaterialIcons name="arrow-back" size={24} color={COLORS.white} />
                    </TouchableOpacity>

                    <View style={styles.headerBadge}>
                        <MaterialIcons name="grid-view" size={14} color={COLORS.primary} />
                        <Text style={styles.headerBadgeText}>
                            {unitId ? `Unit ${unitId.replace('unit-', '')}` : 'Lesson'}
                        </Text>
                    </View>

                    <TouchableOpacity style={styles.headerButton}>
                        <MaterialIcons name="bookmark-border" size={24} color={COLORS.white} />
                    </TouchableOpacity>
                </View>

                {/* Progress Bar (Static placeholder for now, can be dynamic later) */}
                <View style={styles.progressContainer}>
                    <View style={styles.progressLabelRow}>
                        <Text style={styles.progressLabel}>Lesson Progress</Text>
                        <Text style={styles.progressValue}>0%</Text>
                    </View>
                    <View style={styles.progressBar}>
                        <View style={[styles.progressFill, { width: '0%' }]} />
                    </View>
                </View>

                <View style={styles.headerContainer}>
                    <Text style={styles.dateText}>LESSON • 5 MIN</Text>
                    <Text style={styles.title}>{content.title}</Text>
                </View>

                {/* Dynamic Content Rendering */}
                <View style={styles.contentContainer}>
                    {content.sections.map(section => (
                        <View key={section.id} style={styles.sectionContainer}>
                            {section.title && (
                                <View style={styles.sectionHeaderWrapper}>
                                    <View style={styles.sectionLine} />
                                    <View style={styles.sectionTitleContent}>
                                        <MaterialIcons name="auto-awesome" size={16} color={COLORS.primaryLight} style={{ marginRight: 8 }} />
                                        <Text style={styles.sectionHeader}>{section.title}</Text>
                                    </View>
                                </View>
                            )}
                            {section.blocks.map(renderBlock)}
                        </View>
                    ))}
                </View>

                <View style={{ height: 40 }} />
            </ScrollView>

            {/* Bottom Action */}
            <View style={[styles.bottomActionContainer, { paddingBottom: Math.max(insets.bottom, 24) }]} pointerEvents="box-none">
                <View style={styles.actionButtonWrapper} pointerEvents="auto">
                    <TouchableOpacity
                        style={styles.continueButton}
                        activeOpacity={0.95}
                        onPress={() => navigation.navigate('Quiz')}
                    >
                        <Text style={styles.continueButtonText}>Continue Lesson</Text>
                        <MaterialIcons name="arrow-forward" size={20} color={COLORS.white} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: Platform.OS === 'web' ? ('100vh' as any) : '100%',
        width: '100%',
        backgroundColor: COLORS.backgroundDark,
        overflow: 'hidden',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 24,
    },
    headerButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: COLORS.whiteAlpha5,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: COLORS.whiteAlpha5,
    },
    headerBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: COLORS.surfaceDark,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 9999,
        borderWidth: 1,
        borderColor: COLORS.whiteAlpha5,
    },
    headerBadgeText: {
        color: COLORS.whiteAlpha90,
        fontSize: 12,
        fontFamily: 'SpaceGrotesk_700Bold',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    progressContainer: {
        paddingHorizontal: 24,
        marginTop: 0,
        marginBottom: 24,
    },
    progressLabelRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    progressLabel: {
        color: COLORS.gray500,
        fontSize: 12,
        fontFamily: 'SpaceGrotesk_700Bold',
        textTransform: 'uppercase',
    },
    progressValue: {
        color: COLORS.primaryLight,
        fontSize: 12,
        fontFamily: 'SpaceGrotesk_700Bold',
    },
    progressBar: {
        height: 6,
        backgroundColor: COLORS.whiteAlpha10,
        borderRadius: 3,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: COLORS.primary,
        borderRadius: 3,
    },
    headerContainer: {
        paddingHorizontal: 24,
        marginBottom: 24,
    },
    dateText: {
        color: COLORS.primaryLight,
        fontSize: 12,
        fontFamily: 'SpaceGrotesk_700Bold',
        letterSpacing: 1.5,
        textTransform: 'uppercase',
        marginBottom: 8,
    },
    title: {
        fontSize: 32,
        fontFamily: 'SpaceGrotesk_700Bold',
        color: COLORS.white,
        lineHeight: 38,
    },
    contentContainer: {
        paddingHorizontal: 24,
    },
    sectionContainer: {
        marginBottom: 32,
    },
    sectionHeaderWrapper: {
        marginBottom: 20,
        marginTop: 12,
    },
    sectionLine: {
        height: 2,
        width: 40,
        backgroundColor: COLORS.primary,
        borderRadius: 1,
        marginBottom: 8,
    },
    sectionTitleContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    sectionHeader: {
        fontSize: 22,
        fontFamily: 'SpaceGrotesk_700Bold',
        color: COLORS.white,
        letterSpacing: 0.5,
    },
    paragraph: {
        fontSize: 16,
        fontFamily: 'NotoSans_400Regular',
        color: COLORS.gray300,
        lineHeight: 26,
        marginBottom: 16,
    },
    componentContainer: {
        marginVertical: 16,
    },
    // Callout / Pro Tip Styles
    proTipContainer: {
        marginVertical: 24,
    },
    proTipBorder: {
        borderRadius: 12,
        padding: 1, // acts as border width
    },
    proTipCard: {
        backgroundColor: 'rgba(23, 23, 23, 0.95)', // Nearly black
        borderRadius: 11, // slightly less than border
        padding: 20,
    },
    proTipHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 12,
    },
    proTipTitle: {
        color: COLORS.yellow400,
        fontSize: 12,
        fontFamily: 'SpaceGrotesk_700Bold',
        letterSpacing: 1,
        textTransform: 'uppercase',
    },
    proTipText: {
        color: COLORS.gray300,
        fontSize: 14,
        fontFamily: 'NotoSans_400Regular',
        lineHeight: 22,
    },
    // Bottom Action
    bottomActionContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 24,
    },
    actionButtonWrapper: {
        width: '100%',
    },
    continueButton: {
        backgroundColor: COLORS.primary,
        height: 56,
        borderRadius: 28,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 16,
        elevation: 12,
    },
    continueButtonText: {
        color: COLORS.white,
        fontSize: 16,
        fontFamily: 'SpaceGrotesk_700Bold',
        letterSpacing: 0.5,
    },
    centerContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20
    },
    errorText: {
        color: COLORS.gray400,
        fontSize: 18,
        fontFamily: 'SpaceGrotesk_700Bold'
    },
    backButton: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: COLORS.primary,
        borderRadius: 20
    },
    backButtonText: {
        color: COLORS.white,
        fontWeight: 'bold'
    }
});
