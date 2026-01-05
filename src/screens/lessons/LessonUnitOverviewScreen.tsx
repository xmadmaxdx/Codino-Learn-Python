import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    StatusBar,
    Image,
    ScrollView,
    TouchableOpacity,
    Pressable,
    Platform,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

// Colors from guide
const COLORS = {
    primary: '#7f0df2',
    primaryLight: '#9d4df7',
    primaryDark: '#5e08b5',
    backgroundDark: '#191022',
    surfaceDark: '#231630',
    white: '#ffffff',
    gray400: '#9ca3af',
    gray500: '#6b7280',
    gray700: '#374151',
    green400: '#4ade80',
    green500: '#22c55e',
    orange500: '#f97316',
    yellow400: '#fbbf24',
    whiteAlpha5: 'rgba(255, 255, 255, 0.05)',
    whiteAlpha10: 'rgba(255, 255, 255, 0.1)',
    whiteAlpha20: 'rgba(255, 255, 255, 0.2)',
    whiteAlpha40: 'rgba(255, 255, 255, 0.4)',
    whiteAlpha60: 'rgba(255, 255, 255, 0.6)',
    whiteAlpha70: 'rgba(255, 255, 255, 0.7)',
    whiteAlpha80: 'rgba(255, 255, 255, 0.8)',
    whiteAlpha90: 'rgba(255, 255, 255, 0.9)',
    primaryAlpha5: 'rgba(127, 13, 242, 0.05)',
    primaryAlpha10: 'rgba(127, 13, 242, 0.1)',
    primaryAlpha20: 'rgba(127, 13, 242, 0.2)',
    primaryAlpha30: 'rgba(127, 13, 242, 0.3)',
};

import { CURRICULUM, Lesson } from '../../data/curriculum';

interface LessonUnitOverviewScreenProps {
    navigation: any;
    route?: any;
}

export const LessonUnitOverviewScreen: React.FC<LessonUnitOverviewScreenProps> = ({ navigation, route }) => {
    const insets = useSafeAreaInsets();
    const { unitId } = route.params || {};

    // Find the unit, default to unit 3 if not found or no params (for safety)
    const unit = CURRICULUM.find(u => u.id === unitId) || CURRICULUM.find(u => u.id === 'unit-3') || CURRICULUM[0];
    const lessons = unit.lessons;


    const renderLesson = (lesson: Lesson) => {
        const isCompleted = lesson.status === 'completed';
        const isActive = lesson.status === 'active';
        const isLocked = lesson.status === 'locked';

        const onPress = () => {
            // For testing purposes: Allow navigation even if locked
            navigation.navigate('LessonDetail', {
                lessonId: lesson.id,
                unitId: unit.id
            });
        };

        if (isActive) {
            return (
                <Pressable
                    key={lesson.id}
                    style={({ pressed }) => [
                        styles.activeLessonCard,
                        { opacity: pressed ? 0.9 : 1 }
                    ]}
                    onPress={onPress}
                >
                    <View style={styles.activeLessonHeader}>
                        <View style={styles.activeLessonIconContainer}>
                            <MaterialIcons name={lesson.icon} size={28} color={lesson.iconColor || COLORS.primary} />
                        </View>
                        <View style={styles.activeLessonContent}>
                            <View style={styles.activeLessonTitleRow}>
                                <Text style={styles.activeLessonTitle}>{lesson.title}</Text>
                                <View style={styles.activeBadge}>
                                    <Text style={styles.activeBadgeText}>Active</Text>
                                </View>
                            </View>
                            <Text style={styles.activeLessonSubtitle}>{lesson.subtitle || lesson.description}</Text>
                        </View>
                    </View>

                    <View style={styles.activeProgressContainer}>
                        <View style={styles.activeProgressBar}>
                            <View style={[styles.activeProgressFill, { width: `${lesson.progress || 0}%` }]} />
                        </View>
                        <Text style={styles.activeProgressText}>{lesson.steps || '0'} Steps</Text>
                    </View>

                    <View style={styles.resumeButton}>
                        <MaterialIcons name="play-arrow" size={20} color={COLORS.white} />
                        <Text style={styles.resumeButtonText}>Resume Lesson</Text>
                    </View>
                </Pressable>
            );
        }

        return (
            <Pressable
                key={lesson.id}
                onPress={onPress}
                style={({ pressed }) => [
                    styles.lessonCard,
                    isLocked && styles.lessonCardLocked,
                    { opacity: pressed ? 0.7 : 1 }
                ]}
            >
                <View style={[styles.lessonIconContainer, isLocked && styles.lessonIconLocked]}>
                    <MaterialIcons name={lesson.icon} size={28} color={lesson.iconColor || (isLocked ? COLORS.whiteAlpha20 : COLORS.primary)} />
                    {isCompleted && (
                        <View style={styles.completedBadge}>
                            <MaterialIcons name="check" size={14} color={COLORS.white} />
                        </View>
                    )}
                </View>

                <View style={styles.lessonContent}>
                    <View style={styles.lessonTitleRow}>
                        <Text style={[styles.lessonTitle, isLocked && styles.lessonTitleLocked]}>
                            {lesson.title}
                        </Text>
                        {isCompleted && <Text style={styles.doneText}>Done</Text>}
                        {isLocked && <MaterialIcons name="lock" size={18} color={COLORS.whiteAlpha20} />}
                    </View>
                    <Text style={[styles.lessonSubtitle, isLocked && styles.lessonSubtitleLocked]}>
                        {lesson.subtitle || lesson.description}
                    </Text>
                </View>

                {isCompleted && (
                    <View style={styles.refreshButton}>
                        <MaterialIcons name="refresh" size={20} color={COLORS.whiteAlpha20} />
                    </View>
                )}
            </Pressable>
        );
    };

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
                scrollEnabled={true}
                bounces={true}
            >
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.headerButton}
                        onPress={() => navigation.goBack()}
                    >
                        <MaterialIcons name="arrow-back" size={24} color={COLORS.white} />
                    </TouchableOpacity>

                    <View style={styles.headerBadge}>
                        <MaterialIcons name="bolt" size={14} color={COLORS.primary} />
                        <Text style={styles.headerBadgeText}>{unit.title}</Text>
                    </View>

                    <TouchableOpacity style={styles.headerButton}>
                        <MaterialIcons name="more-horiz" size={24} color={COLORS.white} />
                    </TouchableOpacity>
                </View>

                {/* Unit Hero Section */}
                <View style={styles.heroSection}>
                    <Text style={styles.unitLabel}>Unit {unit.id.replace('unit-', '')}</Text>
                    <Text style={styles.heroTitle}>
                        {unit.subtitle}
                    </Text>
                    <Text style={styles.heroDescription}>
                        {unit.description}
                    </Text>
                </View>

                {/* Overall Progress Card */}
                <View style={styles.progressCard}>
                    {/* Subtle Gradient Overlay for Progress Card */}
                    <LinearGradient
                        colors={[COLORS.primaryAlpha20, 'transparent']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={StyleSheet.absoluteFill}
                    />

                    <View style={styles.progressCardHeader}>
                        <View>
                            <Text style={styles.progressPercent}>{unit.progress || 0}%</Text>
                            <Text style={styles.progressLabel}>Complete</Text>
                        </View>
                        <View style={styles.avatarsContainer}>
                            <Image
                                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDgs7tYAdQm2lT-RAxeG-_Gjh53mSiaL-nnIL2ixOahjnX3L_mrHNU1faWM1LYas9mVFvgX08FlW8NHQl98FpQrLefPSS5GKxaNMeQb_JYJN58bzKm3eCtY0XugTdmMX2VArP0z0v_3ZivbH7D8mN-OG3uWyu9EmeCG67yWYtnQZX5jJget-f-F7RVfw6V2lBmHHJFRxHnylUmVe2UGy-zPzPIhSgA20L5rdWezlBjWAkyZls4ZCu2x2dYYOLk-E240tT1Hsl_LCpQB' }}
                                style={[styles.avatar, { marginLeft: 0 }] as any}
                            />
                            <Image
                                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYzXoMzl3u4viN-nbz8H8TQAABGHFwfGkjkUGBCGCdRRtPM77vSNAcpO_WbRziSA5VaxGAQKwaSSV8wBImrRHhwe3m9vBsoOoTERn81Td_he9Ys6qzvQStCYeUd2UylJNibaV_MGcHljoZ-Ji5dcqIrJqroZaJcM2tMMlM_sP2PVxOiYM2TfHBYrnKRiXESCPTcD-13dXkZvxx8GqodypPXV0Vy4WR3CFo_F2nXn_QKiPQUmdBLSY7yTCykdkxpm_0k2rt3y0G65dz' }}
                                style={[styles.avatar, { marginLeft: -8 }] as any}
                            />
                            <View style={styles.avatarMore}>
                                <Text style={styles.avatarMoreText}>+24</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.progressBarContainer}>
                        <LinearGradient
                            colors={[COLORS.primaryDark, COLORS.primary]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={[styles.progressFill, { width: `${unit.progress || 0}%` }]}
                        />
                    </View>
                </View>

                {/* Lessons Section */}
                <View style={styles.lessonsSection}>
                    <View style={styles.lessonsHeader}>
                        <Text style={styles.lessonsTitle}>Lessons</Text>
                        <View style={styles.lessonsBadge}>
                            <Text style={styles.lessonsBadgeText}>{unit.lessons.length} Topics</Text>
                        </View>
                    </View>

                    {lessons.map(renderLesson)}

                    {/* Quiz Card - UPDATED Visuals */}
                    <Pressable
                        style={({ pressed }) => [
                            styles.quizCardContainer,
                            { opacity: pressed ? 0.9 : 1 }
                        ]}
                        onPress={() => navigation.navigate('Quiz')}
                    >
                        {/* Purple/Indigo background from guide with Opacity-60 mixed with SurfaceDark */}
                        {/* Tailwind purple-900: #581c87, indigo-900: #312e81 */}
                        {/* Opacity 0.6 on dark background */}
                        <LinearGradient
                            colors={['rgba(88, 28, 135, 0.6)', 'rgba(49, 46, 129, 0.6)']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={StyleSheet.absoluteFill}
                        />

                        {/* Blur/Glow effect (simulated) */}
                        <View style={styles.quizCardGlow} />

                        <View style={styles.quizCardContentRelative}>
                            <View style={styles.quizLeftContent}>
                                <LinearGradient
                                    colors={['#facc15', '#f97316']} // yellow-400 to orange-500
                                    style={styles.quizTrophyContainer}
                                >
                                    <MaterialIcons name="emoji-events" size={24} color={COLORS.white} />
                                </LinearGradient>
                                <View style={styles.quizTextContent}>
                                    <Text style={styles.quizTitle}>Unit {unit.id.replace('unit-', '')} Challenge</Text>
                                    <Text style={styles.quizSubtitle}>Pass to unlock Unit {parseInt(unit.id.replace('unit-', '')) + 1}</Text>
                                </View>
                            </View>
                            <View style={styles.quizButton}>
                                <MaterialIcons name="chevron-right" size={20} color={COLORS.white} />
                            </View>
                        </View>
                    </Pressable>
                </View>
            </ScrollView>

            {/* Fixed Bottom Tab Bar */}
            <View style={[styles.tabBarContainer, { paddingBottom: Math.max(insets.bottom, 24) }]} pointerEvents="box-none">
                <View style={styles.tabBar}>
                    <TouchableOpacity
                        style={styles.tabItem}
                        onPress={() => navigation.navigate('HomeDashboard')}
                    >
                        <View style={styles.tabIcon}>
                            <MaterialIcons name="home" size={24} color={COLORS.gray400} />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.tabItem}
                        onPress={() => navigation.navigate('LessonUnitOverview')}
                    >
                        <View style={styles.tabIconActive}>
                            <MaterialIcons name="school" size={24} color={COLORS.white} />
                        </View>
                        {/* <View style={styles.tabDotActive} /> */}
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.tabItem}
                        onPress={() => navigation.navigate('CommunityHub')}
                    >
                        <View style={styles.tabIcon}>
                            <MaterialIcons name="forum" size={24} color={COLORS.gray400} />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.tabItem}
                        onPress={() => navigation.navigate('Profile')}
                    >
                        <View style={styles.tabIcon}>
                            <MaterialIcons name="person" size={24} color={COLORS.gray400} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // FIX: Web responsive layout constraint
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
        color: COLORS.whiteAlpha80,
        fontSize: 12,
        fontFamily: 'SpaceGrotesk_700Bold',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    heroSection: {
        paddingHorizontal: 24,
        paddingTop: 8,
        paddingBottom: 32,
        gap: 8,
    },
    unitLabel: {
        color: COLORS.primaryLight,
        fontSize: 14,
        fontFamily: 'SpaceGrotesk_500Medium',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    heroTitle: {
        color: COLORS.white,
        fontSize: 40,
        fontFamily: 'SpaceGrotesk_700Bold',
        lineHeight: 44,
        letterSpacing: -0.5,
    },
    heroDescription: {
        color: COLORS.whiteAlpha60,
        fontSize: 18,
        fontFamily: 'NotoSans_400Regular',
        lineHeight: 28,
        maxWidth: 448,
        marginTop: 8,
    },
    progressCard: {
        marginHorizontal: 24,
        padding: 20,
        borderRadius: 16,
        backgroundColor: COLORS.surfaceDark,
        borderWidth: 1,
        borderColor: COLORS.whiteAlpha5,
        marginBottom: 32,
        overflow: 'hidden', // for gradient
    },
    progressCardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: 12,
        position: 'relative',
        zIndex: 1,
    },
    progressPercent: {
        color: COLORS.white,
        fontSize: 30,
        fontFamily: 'SpaceGrotesk_700Bold',
    },
    progressLabel: {
        color: COLORS.whiteAlpha40,
        fontSize: 14,
        fontFamily: 'NotoSans_400Regular',
    },
    avatarsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: COLORS.surfaceDark,
    },
    avatarMore: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: -8,
        borderWidth: 2,
        borderColor: COLORS.surfaceDark,
    },
    avatarMoreText: {
        color: COLORS.white,
        fontSize: 10,
        fontFamily: 'SpaceGrotesk_700Bold',
    },
    progressBarContainer: {
        height: 8,
        width: '100%',
        borderRadius: 9999,
        backgroundColor: COLORS.whiteAlpha10,
        overflow: 'hidden',
        position: 'relative',
        zIndex: 1,
    },
    progressFill: {
        height: '100%',
        borderRadius: 9999,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
    },
    lessonsSection: {
        paddingHorizontal: 24,
        gap: 16,
    },
    lessonsHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 8,
    },
    lessonsTitle: {
        color: COLORS.white,
        fontSize: 20,
        fontFamily: 'SpaceGrotesk_700Bold',
    },
    lessonsBadge: {
        backgroundColor: COLORS.whiteAlpha10,
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 9999,
    },
    lessonsBadgeText: {
        color: COLORS.whiteAlpha70,
        fontSize: 12,
        fontFamily: 'NotoSans_400Regular',
    },
    lessonCard: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        padding: 16,
        borderRadius: 16,
        backgroundColor: 'rgba(35, 22, 48, 0.5)',
        borderWidth: 1,
        borderColor: COLORS.whiteAlpha5,
        // Web focus
        // @ts-ignore
        cursor: 'pointer',
        userSelect: 'none',
    },
    lessonCardLocked: {
        opacity: 0.7,
        // @ts-ignore
        cursor: 'default',
    },
    lessonIconContainer: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#1e293b',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    lessonIconLocked: {
        backgroundColor: COLORS.whiteAlpha5,
    },
    completedBadge: {
        position: 'absolute',
        bottom: -4,
        right: -4,
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: COLORS.green500,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: COLORS.surfaceDark,
    },
    lessonContent: {
        flex: 1,
    },
    lessonTitleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 2,
    },
    lessonTitle: {
        color: COLORS.whiteAlpha90,
        fontSize: 16,
        fontFamily: 'SpaceGrotesk_700Bold',
        flex: 1,
    },
    lessonTitleLocked: {
        color: COLORS.whiteAlpha40,
    },
    doneText: {
        color: COLORS.green400,
        fontSize: 12,
        fontFamily: 'SpaceGrotesk_500Medium',
    },
    lessonSubtitle: {
        color: COLORS.whiteAlpha40,
        fontSize: 14,
        fontFamily: 'NotoSans_400Regular',
    },
    lessonSubtitleLocked: {
        color: COLORS.whiteAlpha20,
    },
    refreshButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    activeLessonCard: {
        padding: 20,
        borderRadius: 16,
        backgroundColor: COLORS.surfaceDark,
        borderWidth: 2,
        borderColor: COLORS.primary,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 12,
        // Web focus
        // @ts-ignore
        cursor: 'pointer',
        userSelect: 'none',
    },
    activeLessonHeader: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 16,
    },
    activeLessonIconContainer: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: COLORS.primaryAlpha20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    activeLessonContent: {
        flex: 1,
    },
    activeLessonTitleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    activeLessonTitle: {
        color: COLORS.white,
        fontSize: 18,
        fontFamily: 'SpaceGrotesk_700Bold',
    },
    activeBadge: {
        backgroundColor: COLORS.primaryAlpha20,
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 9999,
    },
    activeBadgeText: {
        color: COLORS.primary,
        fontSize: 12,
        fontFamily: 'SpaceGrotesk_700Bold',
        textTransform: 'uppercase',
    },
    activeLessonSubtitle: {
        color: COLORS.whiteAlpha60,
        fontSize: 14,
        fontFamily: 'NotoSans_400Regular',
    },
    activeProgressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 20,
    },
    activeProgressBar: {
        flex: 1,
        height: 6,
        borderRadius: 9999,
        backgroundColor: COLORS.whiteAlpha10,
        overflow: 'hidden',
    },
    activeProgressFill: {
        height: '100%',
        borderRadius: 9999,
        backgroundColor: COLORS.primary,
    },
    activeProgressText: {
        color: COLORS.whiteAlpha40,
        fontSize: 12,
        fontFamily: 'SpaceGrotesk_500Medium',
    },
    resumeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        backgroundColor: COLORS.primary,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 9999,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        elevation: 8,
    },
    resumeButtonText: {
        color: COLORS.white,
        fontSize: 14,
        fontFamily: 'SpaceGrotesk_700Bold',
    },
    quizCardContainer: {
        borderRadius: 16,
        marginTop: 8,
        overflow: 'hidden',
        position: 'relative',
        minHeight: 120, // Ensure height for gradient
    },
    quizCardGlow: {
        position: 'absolute',
        top: -20,
        right: -20,
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: COLORS.primary,
        opacity: 0.4,
        // blurRadius in React Native is usually handled by BlurView or image blur
        // Here we use opacity/overlay to simulate
    },
    quizCardContentRelative: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        zIndex: 10,
    },
    quizLeftContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    quizTrophyContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#f97316', // orange-500
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    quizTextContent: {
        justifyContent: 'center',
    },
    quizTitle: {
        color: COLORS.white,
        fontSize: 18,
        fontFamily: 'SpaceGrotesk_700Bold',
    },
    quizSubtitle: {
        color: COLORS.whiteAlpha70,
        fontSize: 14,
        fontFamily: 'NotoSans_400Regular',
    },
    quizButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.whiteAlpha10,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: COLORS.whiteAlpha10,
    },
    tabBarContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 16,
        paddingTop: 24,
        alignItems: 'center',
        zIndex: 1000,
    },
    tabBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 64,
        width: '100%',
        maxWidth: 384,
        paddingHorizontal: 32,
        borderRadius: 9999,
        backgroundColor: 'rgba(38, 24, 52, 0.95)',
        borderWidth: 1,
        borderColor: COLORS.whiteAlpha10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 24,
        elevation: 16,
    },
    tabItem: {
        alignItems: 'center',
        gap: 4,
    },
    tabIconActive: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 8,
    },
    tabIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabDotActive: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: COLORS.primary,
    },
});

export default LessonUnitOverviewScreen;
