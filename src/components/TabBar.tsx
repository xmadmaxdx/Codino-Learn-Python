import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../theme';

const { width } = Dimensions.get('window');

type TabName = 'Home' | 'Community' | 'Profile';

interface TabBarProps {
    activeTab: TabName;
    onTabPress: (tab: TabName) => void;
}

interface TabItemProps {
    name: TabName;
    icon: keyof typeof MaterialIcons.glyphMap;
    isActive: boolean;
    onPress: () => void;
}

const TabItem: React.FC<TabItemProps> = ({ name, icon, isActive, onPress }) => {
    return (
        <TouchableOpacity
            style={styles.tabItem}
            onPress={onPress}
            activeOpacity={0.7}
        >
            {/* Glow indicator above active tab */}
            {isActive && (
                <View style={styles.activeGlow}>
                    <View style={styles.glowBar} />
                </View>
            )}

            <View style={[styles.iconContainer, isActive && styles.activeIconContainer]}>
                <MaterialIcons
                    name={icon}
                    size={24}
                    color={isActive ? colors.primary : colors.gray400}
                />
            </View>

            <Text style={[styles.tabLabel, isActive && styles.activeLabel]}>
                {name}
            </Text>
        </TouchableOpacity>
    );
};

export const TabBar: React.FC<TabBarProps> = ({ activeTab, onTabPress }) => {
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.container, { paddingBottom: Math.max(insets.bottom, 16) }]}>
            <View style={styles.tabBar}>
                <TabItem
                    name="Home"
                    icon="home"
                    isActive={activeTab === 'Home'}
                    onPress={() => onTabPress('Home')}
                />
                <TabItem
                    name="Community"
                    icon="forum"
                    isActive={activeTab === 'Community'}
                    onPress={() => onTabPress('Community')}
                />
                <TabItem
                    name="Profile"
                    icon="person"
                    isActive={activeTab === 'Profile'}
                    onPress={() => onTabPress('Profile')}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingTop: 16,
    },
    tabBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(25, 16, 34, 0.95)',
        borderRadius: 9999,
        paddingHorizontal: 24,
        paddingVertical: 12,
        width: Math.min(width - 48, 320),
        borderWidth: 1,
        borderColor: colors.whiteAlpha10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 24,
        elevation: 16,
    },
    tabItem: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        position: 'relative',
    },
    iconContainer: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    },
    activeIconContainer: {
        // Active state styling if needed
    },
    tabLabel: {
        fontFamily: 'SpaceGrotesk_500Medium',
        fontSize: 10,
        color: colors.gray400,
        marginTop: 2,
    },
    activeLabel: {
        color: colors.primary,
        fontFamily: 'SpaceGrotesk_700Bold',
    },
    activeGlow: {
        position: 'absolute',
        top: -20,
        width: 48,
        alignItems: 'center',
    },
    glowBar: {
        width: 32,
        height: 4,
        backgroundColor: colors.primary,
        borderRadius: 2,
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 8,
        elevation: 8,
    },
});

export default TabBar;
