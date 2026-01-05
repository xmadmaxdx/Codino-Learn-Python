import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../../../constants/colors';

interface PremiumGlowWrapperProps {
    children: React.ReactNode;
    color?: string;
    intensity?: number;
    containerStyle?: ViewStyle;
}

export const PremiumGlowWrapper: React.FC<PremiumGlowWrapperProps> = ({
    children,
    color = COLORS.primary,
    intensity = 0.15,
    containerStyle
}) => {
    return (
        <View style={[styles.outerContainer, containerStyle]}>
            {/* Soft Ambient Glow */}
            <LinearGradient
                colors={[`${color}00`, `${color}${Math.floor(intensity * 255).toString(16).padStart(2, '0')}`, `${color}00`]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.glow}
            />
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    outerContainer: {
        position: 'relative',
        marginVertical: 12,
    },
    glow: {
        position: 'absolute',
        top: -20,
        left: -20,
        right: -20,
        bottom: -20,
        opacity: 0.5,
        borderRadius: 40,
        zIndex: -1,
    }
});
