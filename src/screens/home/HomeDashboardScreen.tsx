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
    Platform,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

// Colors from guide
const COLORS = {
    primary: '#7f0df2',
    backgroundDark: '#191022',
    cardDark: '#261834',
    white: '#ffffff',
    gray300: '#d1d5db',
    gray400: '#9ca3af',
    gray500: '#6b7280',
    orange500: '#f97316',
    green500: '#22c55e',
    yellow400: '#fbbf24',
    whiteAlpha5: 'rgba(255, 255, 255, 0.05)',
    whiteAlpha10: 'rgba(255, 255, 255, 0.1)',
    whiteAlpha20: 'rgba(255, 255, 255, 0.2)',
    primaryAlpha10: 'rgba(127, 13, 242, 0.1)',
    primaryAlpha20: 'rgba(127, 13, 242, 0.2)',
    primaryAlpha30: 'rgba(127, 13, 242, 0.3)',
    primaryAlpha50: 'rgba(127, 13, 242, 0.5)',
};

interface HomeDashboardScreenProps {
    navigation: any;
}

import { CURRICULUM, Unit } from '../../data/curriculum';

// Find current unit for dashboard display
const currentUnit = CURRICULUM.find(u => u.status === 'current') || CURRICULUM[0];


export const HomeDashboardScreen: React.FC<HomeDashboardScreenProps> = ({ navigation }) => {
    const insets = useSafeAreaInsets();

    const renderPathItem = (item: Unit, index: number) => {
        const isCompleted = item.status === 'completed';
        const isCurrent = item.status === 'current';
        const isLocked = item.status === 'locked';

        return (
            <View key={item.id} style={styles.pathItemContainer}>
                {/* Node indicator */}
                <View style={styles.nodeWrapper}>
                    {isCompleted && (
                        <View style={styles.nodeCompleted}>
                            <MaterialIcons name="check" size={14} color={COLORS.white} style={{ fontWeight: '700' }} />
                        </View>
                    )}
                    {isCurrent && (
                        <View style={styles.nodeCurrent}>
                            <View style={styles.nodeCurrentInner} />
                        </View>
                    )}
                    {isLocked && (
                        <View style={styles.nodeLocked}>
                            <MaterialIcons name="lock" size={14} color={COLORS.gray400} />
                        </View>
                    )}
                </View>

                {/* Card */}
                <TouchableOpacity
                    style={[
                        styles.pathCard,
                        isCompleted && styles.pathCardCompleted,
                        isCurrent && styles.pathCardCurrent,
                        isLocked && styles.pathCardLocked,
                    ]}
                    activeOpacity={isLocked ? 1 : 0.7}
                    onPress={() => navigation.navigate('LessonUnitOverview', { unitId: item.id })}
                >
                    {isCurrent && item.icon && (
                        <View style={styles.currentIconContainer}>
                            <MaterialIcons name={item.icon} size={24} color={COLORS.primary} />
                        </View>
                    )}
                    <View style={styles.pathCardContent}>
                        <Text style={[
                            styles.pathCardTitle,
                            isCompleted && styles.pathCardTitleCompleted,
                        ]}>
                            {item.title}
                        </Text>
                        <Text style={[
                            styles.pathCardSubtitle,
                            isCurrent && styles.pathCardSubtitleCurrent,
                        ]}>
                            {item.subtitle}
                        </Text>
                    </View>
                    {isCompleted && (
                        <MaterialIcons name="emoji-events" size={20} color={COLORS.primary} />
                    )}
                    {isCurrent && (
                        <MaterialIcons name="chevron-right" size={24} color={COLORS.gray400} />
                    )}
                </TouchableOpacity>
            </View>
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

            {/* Main Content ScrollView */}
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={[
                    styles.scrollContent,
                    { paddingTop: insets.top, paddingBottom: 150 } // Content padding so items aren't hidden behind tab bar
                ]}
                showsVerticalScrollIndicator={false}
                scrollEnabled={true}
                bounces={true}
                overScrollMode="always"
            >
                {/* Top App Bar */}
                <View style={styles.topBar}>
                    <View style={styles.userInfo}>
                        <View style={styles.avatarContainer}>
                            <Image
                                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQbSMFn7qp6RjZxXtH6N50NLLoU2XtmKn5ahQ-Hk5Pyawn9uYaIZE9nukvprk92CRMV5c7tR69soXvgs0QhNLlKiS4KgCZ0qZypkuh3wHLUu_X6pOQXtot9wdPBAuyH4_q0qK_jm03rQl1mlI6PoU3sb8LBDkToMkSBx1MGMJaBVuSptrDXqYm2ucyW0_z0YEtr070X0pLShY3HQJz7SGlxdZx7Ey4815rnSY8gW0OqCqWZ6qkE6CvRzcMC8NBiVcjyU98GNgfybI-' }}
                                style={styles.avatar}
                            />
                            <View style={styles.onlineIndicator} />
                        </View>
                        <View>
                            <Text style={styles.greeting}>Hello, Alex</Text>
                            <View style={styles.levelBadge}>
                                <Text style={styles.levelText}>Lvl 5</Text>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.streakButton}>
                        <MaterialIcons name="local-fire-department" size={20} color={COLORS.orange500} />
                        <Text style={styles.streakText}>12</Text>
                    </TouchableOpacity>
                </View>

                {/* Greeting Headline */}
                <View style={styles.headlineContainer}>
                    <Text style={styles.headline}>
                        Let's code some {'\n'}
                        <Text style={styles.headlineGradient}>Python Magic.</Text>
                    </Text>
                </View>

                {/* Continue Learning Card */}
                <View style={styles.cardContainer}>
                    <TouchableOpacity
                        style={styles.continueCard}
                        activeOpacity={0.9}
                        onPress={() => navigation.navigate('LessonUnitOverview')}
                    >
                        {/* Background Image Overlay */}
                        <Image
                            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnVWjjzY-oVYOxMCCv9MIn-0nz24UuGdkDpCXJdiASnkFs1i6czlZFcai_4Yj16Chd4KA6kzccKWuBKkmBBxfIgDgOZ9PQq1UrqF-QlivRUrG8Gzac2Oj5YGGkzAQK8_fth6rRlF2x65mKVnY1Zrqj-rTfaqX12ZV-kFSE3CSWaed9eDDCOvhWmnN15rMUFg9b5hf2132-J3SVECErMAKo6nNI6xswgEaP6T3EAq60QZNXyibTZtUDQC900_xM2N3pmaKLHhUNl2Bo' }}
                            style={styles.cardBackgroundImage}
                            resizeMode="cover"
                        />

                        <View style={styles.continueCardContent}>
                            <View style={styles.cardHeader}>
                                <View style={styles.codeBlockIcon}>
                                    <MaterialIcons name="code" size={24} color={COLORS.white} />
                                </View>
                                <View style={styles.inProgressBadge}>
                                    <Text style={styles.inProgressText}>In Progress</Text>
                                </View>
                            </View>

                            <Text style={styles.cardTitle}>Module 3: While Loops</Text>
                            <Text style={styles.cardSubtitle}>Mastering the art of repetition.</Text>

                            <View style={styles.cardFooter}>
                                <View style={styles.progressSection}>
                                    <View style={styles.progressLabels}>
                                        <Text style={styles.progressLabel}>Progress</Text>
                                        <Text style={styles.progressLabel}>65%</Text>
                                    </View>
                                    <View style={styles.progressBar}>
                                        <View style={styles.progressFill} />
                                    </View>
                                </View>
                                <TouchableOpacity style={styles.resumeButton}>
                                    <Text style={styles.resumeButtonText}>Resume</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Learning Path Section */}
                <View style={styles.pathSection}>
                    <View style={styles.pathHeader}>
                        <Text style={styles.pathTitle}>Your Path</Text>
                        <TouchableOpacity>
                            <Text style={styles.viewCurriculum}>View Curriculum</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.pathContainer}>
                        <View style={styles.connectingLine} />
                        {CURRICULUM.map(renderPathItem)}

                        {/* Milestone Reward */}
                        <View style={styles.milestoneContainer}>
                            <LinearGradient
                                colors={[COLORS.yellow400, COLORS.orange500]}
                                style={styles.milestoneBadge}
                            >
                                <MaterialIcons name="inventory-2" size={18} color={COLORS.white} />
                            </LinearGradient>
                            <Text style={styles.milestoneText}>Milestone Reward</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Fixed Bottom Navigation - Using box-none to allow clicking through empty space */}
            <View
                style={[styles.tabBarContainer, { paddingBottom: Math.max(insets.bottom, 24) }]}
                pointerEvents="box-none"
            >
                <View style={styles.tabBar}>
                    <TouchableOpacity style={styles.tabItem}>
                        <View style={styles.tabIconActive}>
                            <MaterialIcons name="home" size={24} color={COLORS.white} />
                        </View>
                        <View style={styles.tabDotActive} />
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
        // FIX: Ensure container takes fixed height of window, preventing it from growing with ScrollView on web
        height: Platform.OS === 'web' ? ('100vh' as any) : '100%',
        width: '100%',
        backgroundColor: COLORS.backgroundDark,
        overflow: 'hidden', // FIX: Ensure content is clipped
    },
    scrollView: {
        flex: 1, // Take available space within fixed container
    },
    scrollContent: {
        flexGrow: 1,
    },
    // ... (Header and Card styles same as before)
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 24,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    avatarContainer: {
        position: 'relative',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: COLORS.primaryAlpha50,
    },
    onlineIndicator: {
        position: 'absolute',
        bottom: -4,
        right: -4,
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: COLORS.green500,
        borderWidth: 2,
        borderColor: COLORS.backgroundDark,
    },
    greeting: {
        color: COLORS.gray400,
        fontSize: 14,
        fontFamily: 'SpaceGrotesk_500Medium',
    },
    levelBadge: {
        backgroundColor: COLORS.primaryAlpha10,
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 9999,
        marginTop: 4,
        alignSelf: 'flex-start',
    },
    levelText: {
        color: COLORS.primary,
        fontSize: 12,
        fontFamily: 'SpaceGrotesk_700Bold',
    },
    streakButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: COLORS.cardDark,
        borderWidth: 1,
        borderColor: COLORS.whiteAlpha5,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 9999,
    },
    streakText: {
        color: COLORS.white,
        fontSize: 14,
        fontFamily: 'SpaceGrotesk_700Bold',
    },
    headlineContainer: {
        paddingHorizontal: 24,
        paddingBottom: 8,
    },
    headline: {
        color: COLORS.white,
        fontSize: 30,
        fontFamily: 'SpaceGrotesk_700Bold',
        lineHeight: 36,
    },
    headlineGradient: {
        color: COLORS.primary,
    },
    cardContainer: {
        paddingHorizontal: 24,
        paddingTop: 16,
    },
    continueCard: {
        borderRadius: 16,
        backgroundColor: COLORS.cardDark,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: COLORS.whiteAlpha10,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 32,
        elevation: 12,
    },
    cardBackgroundImage: {
        ...StyleSheet.absoluteFillObject,
        opacity: 0.4,
    },
    continueCardContent: {
        padding: 24,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    codeBlockIcon: {
        backgroundColor: COLORS.whiteAlpha10,
        padding: 8,
        borderRadius: 8,
    },
    inProgressBadge: {
        backgroundColor: COLORS.primaryAlpha20,
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 9999,
    },
    inProgressText: {
        color: '#d8b4fe',
        fontSize: 12,
        fontFamily: 'SpaceGrotesk_700Bold',
    },
    cardTitle: {
        color: COLORS.white,
        fontSize: 20,
        fontFamily: 'SpaceGrotesk_700Bold',
        marginBottom: 4,
    },
    cardSubtitle: {
        color: COLORS.gray300,
        fontSize: 14,
        fontFamily: 'NotoSans_400Regular',
        marginBottom: 24,
    },
    cardFooter: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: 16,
    },
    progressSection: {
        flex: 1,
        gap: 8,
    },
    progressLabels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    progressLabel: {
        color: COLORS.gray400,
        fontSize: 12,
        fontFamily: 'NotoSans_400Regular',
    },
    progressBar: {
        height: 8,
        width: '100%',
        borderRadius: 9999,
        backgroundColor: COLORS.whiteAlpha10,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        width: '65%',
        borderRadius: 9999,
        backgroundColor: COLORS.primary,
    },
    resumeButton: {
        height: 40,
        minWidth: 100,
        paddingHorizontal: 16,
        borderRadius: 9999,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 15,
        elevation: 8,
    },
    resumeButtonText: {
        color: COLORS.white,
        fontSize: 14,
        fontFamily: 'SpaceGrotesk_700Bold',
    },
    pathSection: {
        paddingHorizontal: 24,
        paddingTop: 16,
    },
    pathHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 24,
    },
    pathTitle: {
        color: COLORS.white,
        fontSize: 18,
        fontFamily: 'SpaceGrotesk_700Bold',
    },
    viewCurriculum: {
        color: COLORS.primary,
        fontSize: 12,
        fontFamily: 'SpaceGrotesk_500Medium',
    },
    pathContainer: {
        position: 'relative',
        paddingLeft: 16,
        gap: 32,
    },
    connectingLine: {
        position: 'absolute',
        left: 27,
        top: 8,
        bottom: 40,
        width: 2,
        backgroundColor: COLORS.primaryAlpha30,
    },
    pathItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 24,
    },
    nodeWrapper: {
        width: 24,
        height: 24,
        zIndex: 1,
    },
    nodeCompleted: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 4,
        borderColor: COLORS.backgroundDark,
    },
    nodeCurrent: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 4,
        borderColor: COLORS.backgroundDark,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 8,
    },
    nodeCurrentInner: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: COLORS.white,
    },
    nodeLocked: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#374151',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 4,
        borderColor: COLORS.backgroundDark,
    },
    pathCard: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 12,
        backgroundColor: COLORS.cardDark,
        borderWidth: 1,
        borderColor: COLORS.whiteAlpha5,
    },
    pathCardCompleted: {
        opacity: 0.6,
    },
    pathCardCurrent: {
        backgroundColor: '#2e1d3d',
        padding: 20,
        borderColor: COLORS.primaryAlpha30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 20,
        elevation: 8,
    },
    pathCardLocked: {
        opacity: 0.5,
    },
    currentIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.primaryAlpha10,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    pathCardContent: {
        flex: 1,
    },
    pathCardTitle: {
        color: COLORS.white,
        fontSize: 16,
        fontFamily: 'SpaceGrotesk_700Bold',
        marginBottom: 2,
    },
    pathCardTitleCompleted: {
        textDecorationLine: 'line-through',
        color: COLORS.gray500,
    },
    pathCardSubtitle: {
        color: COLORS.gray500,
        fontSize: 12,
        fontFamily: 'NotoSans_400Regular',
    },
    pathCardSubtitleCurrent: {
        color: COLORS.primary,
        fontFamily: 'SpaceGrotesk_500Medium',
    },
    milestoneContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 24,
        marginTop: 8,
        marginLeft: -4,
    },
    milestoneBadge: {
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 4,
        borderColor: COLORS.backgroundDark,
        shadowColor: '#f97316',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
        elevation: 8,
    },
    milestoneText: {
        color: COLORS.gray500,
        fontSize: 12,
        fontFamily: 'SpaceGrotesk_700Bold',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    tabBarContainer: {
        position: 'absolute',
        bottom: 0, // This will now be relative to the fixed height container
        left: 0,
        right: 0,
        paddingHorizontal: 16,
        paddingTop: 24,
        alignItems: 'center',
        zIndex: 99999,
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
        backgroundColor: 'rgba(38, 24, 52, 1)',
        borderWidth: 1,
        borderColor: COLORS.whiteAlpha10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.8,
        shadowRadius: 24,
        elevation: 20,
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
        padding: 2,
    },
    tabDotActive: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: COLORS.primary,
    },
});

export default HomeDashboardScreen;
