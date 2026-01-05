import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    StatusBar,
    ScrollView,
    TouchableOpacity,
    Image,
    Platform,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

// Colors from guide
const COLORS = {
    primary: '#7f0df2',
    backgroundDark: '#191022',
    surfaceDark: '#231630',
    white: '#ffffff',
    gray400: '#9ca3af',
    gray500: '#6b7280',
    orange500: '#f97316',
    yellow400: '#fbbf24',
    gold: '#FFD700',
    silver: '#C0C0C0',
    bronze: '#CD7F32',
    whiteAlpha5: 'rgba(255, 255, 255, 0.05)',
    whiteAlpha10: 'rgba(255, 255, 255, 0.1)',
    whiteAlpha20: 'rgba(255, 255, 255, 0.2)',
    whiteAlpha40: 'rgba(255, 255, 255, 0.4)',
    whiteAlpha70: 'rgba(255, 255, 255, 0.7)',
    whiteAlpha80: 'rgba(255, 255, 255, 0.8)',
    primaryAlpha20: 'rgba(127, 13, 242, 0.2)',
};

interface LeaderboardScreenProps {
    navigation: any;
}

interface LeaderboardUser {
    id: string;
    rank: number;
    name: string;
    avatar: string;
    xp: number;
    streak?: number;
    badge?: 'gold' | 'silver' | 'bronze';
}

const topThree: LeaderboardUser[] = [
    {
        id: '2',
        rank: 2,
        name: 'Sarah K.',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDgs7tYAdQm2lT-RAxeG-_Gjh53mSiaL-nnIL2ixOahjnX3L_mrHNU1faWM1LYas9mVFvgX08FlW8NHQl98FpQrLefPSS5GKxaNMeQb_JYJN58bzKm3eCtY0XugTdmMX2VArP0z0v_3ZivbH7D8mN-OG3uWyu9EmeCG67yWYtnQZX5jJget-f-F7RVfw6V2lBmHHJFRxHnylUmVe2UGy-zPzPIhSgA20L5rdWezlBjWAkyZls4ZCu2x2dYYOLk-E240tT1Hsl_LCpQB',
        xp: 2850,
        badge: 'silver',
    },
    {
        id: '1',
        rank: 1,
        name: 'Alex Code',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQbSMFn7qp6RjZxXtH6N50NLLoU2XtmKn5ahQ-Hk5Pyawn9uYaIZE9nukvprk92CRMV5c7tR69soXvgs0QhNLlKiS4KgCZ0qZypkuh3wHLUu_X6pOQXtot9wdPBAuyH4_q0qK_jm03rQl1mlI6PoU3sb8LBDkToMkSBx1MGMJaBVuSptrDXqYm2ucyW0_z0YEtr070X0pLShY3HQJz7SGlxdZx7Ey4815rnSY8gW0OqCqWZ6qkE6CvRzcMC8NBiVcjyU98GNgfybI-',
        xp: 3200,
        badge: 'gold',
    },
    {
        id: '3',
        rank: 3,
        name: 'Mike D.',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYzXoMzl3u4viN-nbz8H8TQAABGHFwfGkjkUGBCGCdRRtPM77vSNAcpO_WbRziSA5VaxGAQKwaSSV8wBImrRHhwe3m9vBsoOoTERn81Td_he9Ys6qzvQStCYeUd2UylJNibaV_MGcHljoZ-Ji5dcqIrJqroZaJcM2tMMlM_sP2PVxOiYM2TfHBYrnKRiXESCPTcD-13dXkZvxx8GqodypPXV0Vy4WR3CFo_F2nXn_QKiPQUmdBLSY7yTCykdkxpm_0k2rt3y0G65dz',
        xp: 2700,
        badge: 'bronze',
    },
];

const restOfPack: LeaderboardUser[] = [
    { id: '4', rank: 4, name: 'Elena Codes', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDgs7tYAdQm2lT-RAxeG-_Gjh53mSiaL-nnIL2ixOahjnX3L_mrHNU1faWM1LYas9mVFvgX08FlW8NHQl98FpQrLefPSS5GKxaNMeQb_JYJN58bzKm3eCtY0XugTdmMX2VArP0z0v_3ZivbH7D8mN-OG3uWyu9EmeCG67yWYtnQZX5jJget-f-F7RVfw6V2lBmHHJFRxHnylUmVe2UGy-zPzPIhSgA20L5rdWezlBjWAkyZls4ZCu2x2dYYOLk-E240tT1Hsl_LCpQB', xp: 2580, streak: 14 },
    { id: '5', rank: 5, name: 'DevMarcus', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYzXoMzl3u4viN-nbz8H8TQAABGHFwfGkjkUGBCGCdRRtPM77vSNAcpO_WbRziSA5VaxGAQKwaSSV8wBImrRHhwe3m9vBsoOoTERn81Td_he9Ys6qzvQStCYeUd2UylJNibaV_MGcHljoZ-Ji5dcqIrJqroZaJcM2tMMlM_sP2PVxOiYM2TfHBYrnKRiXESCPTcD-13dXkZvxx8GqodypPXV0Vy4WR3CFo_F2nXn_QKiPQUmdBLSY7yTCykdkxpm_0k2rt3y0G65dz', xp: 2450, streak: 8 },
    { id: '6', rank: 6, name: 'PyNewbie', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQbSMFn7qp6RjZxXtH6N50NLLoU2XtmKn5ahQ-Hk5Pyawn9uYaIZE9nukvprk92CRMV5c7tR69soXvgs0QhNLlKiS4KgCZ0qZypkuh3wHLUu_X6pOQXtot9wdPBAuyH4_q0qK_jm03rQl1mlI6PoU3sb8LBDkToMkSBx1MGMJaBVuSptrDXqYm2ucyW0_z0YEtr070X0pLShY3HQJz7SGlxdZx7Ey4815rnSY8gW0OqCqWZ6qkE6CvRzcMC8NBiVcjyU98GNgfybI-', xp: 2320, streak: 21 },
    { id: '7', rank: 7, name: 'CodeMaven', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDgs7tYAdQm2lT-RAxeG-_Gjh53mSiaL-nnIL2ixOahjnX3L_mrHNU1faWM1LYas9mVFvgX08FlW8NHQl98FpQrLefPSS5GKxaNMeQb_JYJN58bzKm3eCtY0XugTdmMX2VArP0z0v_3ZivbH7D8mN-OG3uWyu9EmeCG67yWYtnQZX5jJget-f-F7RVfw6V2lBmHHJFRxHnylUmVe2UGy-zPzPIhSgA20L5rdWezlBjWAkyZls4ZCu2x2dYYOLk-E240tT1Hsl_LCpQB', xp: 2180, streak: 5 },
];

const getBadgeColor = (badge: 'gold' | 'silver' | 'bronze') => {
    switch (badge) {
        case 'gold': return COLORS.gold;
        case 'silver': return COLORS.silver;
        case 'bronze': return COLORS.bronze;
    }
};

export const LeaderboardScreen: React.FC<LeaderboardScreenProps> = ({ navigation }) => {
    const insets = useSafeAreaInsets();

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

            {/* Pure Gradient Background */}
            <LinearGradient
                colors={[COLORS.backgroundDark, '#2a1b3d']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={StyleSheet.absoluteFill}
            />

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={[
                    styles.scrollContent,
                    { paddingTop: insets.top, paddingBottom: 120 }
                ]}
                showsVerticalScrollIndicator={false}
                scrollEnabled={true} // Force enable
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
                    <Text style={styles.headerTitle}>Leaderboard</Text>
                    <View style={styles.headerPlaceholder} />
                </View>

                {/* Timer Card */}
                <View style={styles.timerCard}>
                    <MaterialIcons name="timer" size={24} color={COLORS.primary} />
                    <View style={styles.timerTextContainer}>
                        <Text style={styles.timerLabel}>League ends in</Text>
                        <Text style={styles.timerValue}>02d 14h 30m</Text>
                    </View>
                </View>

                {/* Podium Section */}
                <View style={styles.podiumSection}>
                    {topThree.map((user) => {
                        const badgeColor = user.badge ? getBadgeColor(user.badge) : COLORS.gray400;
                        const isFirst = user.rank === 1;

                        return (
                            <View
                                key={user.id}
                                style={[styles.podiumItem, isFirst && styles.podiumItemFirst]}
                            >
                                {isFirst && (
                                    <MaterialIcons name="emoji-events" size={28} color={COLORS.gold} style={styles.crownIcon} />
                                )}
                                <View style={[styles.podiumAvatarContainer, { borderColor: badgeColor }, isFirst && styles.podiumAvatarContainerFirst]}>
                                    <Image source={{ uri: user.avatar }} style={styles.podiumAvatar as any} />
                                </View>
                                <Text style={[styles.podiumName, isFirst && styles.podiumNameFirst]}>{user.name}</Text>
                                <View style={[styles.xpBadge, { backgroundColor: `${badgeColor}20` }]}>
                                    <MaterialIcons name="bolt" size={14} color={badgeColor} />
                                    <Text style={[styles.xpBadgeText, { color: badgeColor }]}>
                                        {user.xp.toLocaleString()}
                                    </Text>
                                </View>
                                <View style={[styles.rankBadge, { backgroundColor: badgeColor }]}>
                                    <Text style={styles.rankBadgeText}>{user.rank}</Text>
                                </View>
                            </View>
                        );
                    })}
                </View>

                {/* Rest of Pack */}
                <View style={styles.listSection}>
                    <Text style={styles.listTitle}>Rest of the Pack</Text>
                    {restOfPack.map((user) => (
                        <View key={user.id} style={styles.listItem}>
                            <View style={styles.listRank}>
                                <Text style={styles.listRankText}>{user.rank}</Text>
                            </View>
                            <Image source={{ uri: user.avatar }} style={styles.listAvatar as any} />
                            <View style={styles.listUserInfo}>
                                <Text style={styles.listUserName}>{user.name}</Text>
                                {user.streak && (
                                    <View style={styles.streakBadge}>
                                        <MaterialIcons name="local-fire-department" size={14} color={COLORS.orange500} />
                                        <Text style={styles.streakText}>{user.streak}</Text>
                                    </View>
                                )}
                            </View>
                            <View style={styles.listXpContainer}>
                                <MaterialIcons name="bolt" size={16} color={COLORS.yellow400} />
                                <Text style={styles.listXpText}>{user.xp.toLocaleString()}</Text>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>

            {/* Your Rank Bar - Repositioned to Bottom */}
            <View style={[styles.yourRankContainer, { bottom: Math.max(insets.bottom, 24) }]}>
                <View style={styles.yourRankCard}>
                    <View style={styles.yourRankLeft}>
                        <View style={styles.yourRankBadge}>
                            <Text style={styles.yourRankBadgeText}>#12</Text>
                        </View>
                        <Image
                            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQbSMFn7qp6RjZxXtH6N50NLLoU2XtmKn5ahQ-Hk5Pyawn9uYaIZE9nukvprk92CRMV5c7tR69soXvgs0QhNLlKiS4KgCZ0qZypkuh3wHLUu_X6pOQXtot9wdPBAuyH4_q0qK_jm03rQl1mlI6PoU3sb8LBDkToMkSBx1MGMJaBVuSptrDXqYm2ucyW0_z0YEtr070X0pLShY3HQJz7SGlxdZx7Ey4815rnSY8gW0OqCqWZ6qkE6CvRzcMC8NBiVcjyU98GNgfybI-' }}
                            style={styles.yourRankAvatar as any}
                        />
                        <Text style={styles.yourRankName}>You</Text>
                    </View>
                    <View style={styles.yourRankXp}>
                        <MaterialIcons name="bolt" size={18} color={COLORS.yellow400} />
                        <Text style={styles.yourRankXpText}>1,850 XP</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // FIX: Ensure container takes fixed height of window to support web scrolling correctly
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
        paddingHorizontal: 24,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
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
    headerTitle: {
        color: COLORS.white,
        fontSize: 20,
        fontFamily: 'SpaceGrotesk_700Bold',
    },
    headerPlaceholder: {
        width: 48,
    },
    timerCard: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        padding: 16,
        borderRadius: 16,
        backgroundColor: COLORS.surfaceDark,
        borderWidth: 1,
        borderColor: COLORS.whiteAlpha10,
        marginBottom: 32,
    },
    timerTextContainer: {
        flex: 1,
    },
    timerLabel: {
        color: COLORS.gray400,
        fontSize: 13,
        fontFamily: 'NotoSans_400Regular',
    },
    timerValue: {
        color: COLORS.white,
        fontSize: 20,
        fontFamily: 'SpaceGrotesk_700Bold',
    },
    podiumSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        gap: 16,
        marginBottom: 32,
    },
    podiumItem: {
        alignItems: 'center',
        flex: 1,
        maxWidth: 110,
    },
    podiumItemFirst: {
        marginBottom: 16,
    },
    crownIcon: {
        marginBottom: 8,
    },
    podiumAvatarContainer: {
        borderWidth: 3,
        borderRadius: 50,
        padding: 3,
        marginBottom: 12,
    },
    podiumAvatarContainerFirst: {
        transform: [{ scale: 1.15 }],
    },
    podiumAvatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    podiumName: {
        color: COLORS.white,
        fontSize: 14,
        fontFamily: 'SpaceGrotesk_700Bold',
        textAlign: 'center',
        marginBottom: 8,
    },
    podiumNameFirst: {
        fontSize: 16,
    },
    xpBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 9999,
        marginBottom: 8,
    },
    xpBadgeText: {
        fontSize: 13,
        fontFamily: 'SpaceGrotesk_700Bold',
    },
    rankBadge: {
        width: 28,
        height: 28,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rankBadgeText: {
        color: COLORS.white,
        fontSize: 14,
        fontFamily: 'SpaceGrotesk_700Bold',
    },
    listSection: {
        gap: 12,
    },
    listTitle: {
        color: COLORS.gray400,
        fontSize: 14,
        fontFamily: 'SpaceGrotesk_700Bold',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 8,
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 16,
        backgroundColor: COLORS.surfaceDark,
        borderWidth: 1,
        borderColor: COLORS.whiteAlpha5,
    },
    listRank: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: COLORS.whiteAlpha10,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    listRankText: {
        color: COLORS.whiteAlpha70,
        fontSize: 14,
        fontFamily: 'SpaceGrotesk_700Bold',
    },
    listAvatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
        marginRight: 12,
    },
    listUserInfo: {
        flex: 1,
    },
    listUserName: {
        color: COLORS.white,
        fontSize: 16,
        fontFamily: 'SpaceGrotesk_700Bold',
        marginBottom: 2,
    },
    streakBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    streakText: {
        color: COLORS.orange500,
        fontSize: 13,
        fontFamily: 'SpaceGrotesk_500Medium',
    },
    listXpContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    listXpText: {
        color: COLORS.whiteAlpha80,
        fontSize: 15,
        fontFamily: 'SpaceGrotesk_700Bold',
    },
    yourRankContainer: {
        position: 'absolute',
        left: 24,
        right: 24,
        zIndex: 5,
    },
    yourRankCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: COLORS.primary,
        borderRadius: 16,
        padding: 16,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 16,
        elevation: 12,
    },
    yourRankLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    yourRankBadge: {
        backgroundColor: COLORS.whiteAlpha20,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 9999,
    },
    yourRankBadgeText: {
        color: COLORS.white,
        fontSize: 14,
        fontFamily: 'SpaceGrotesk_700Bold',
    },
    yourRankAvatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        borderWidth: 2,
        borderColor: COLORS.whiteAlpha40,
    },
    yourRankName: {
        color: COLORS.white,
        fontSize: 16,
        fontFamily: 'SpaceGrotesk_700Bold',
    },
    yourRankXp: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    yourRankXpText: {
        color: COLORS.white,
        fontSize: 16,
        fontFamily: 'SpaceGrotesk_700Bold',
    },
});

export default LeaderboardScreen;
