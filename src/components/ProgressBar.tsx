import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme';

interface ProgressBarProps {
    progress: number; // 0 to 100
    height?: number;
    style?: ViewStyle;
    showGlow?: boolean;
    backgroundColor?: string;
    gradientColors?: string[];
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
    progress,
    height = 8,
    style,
    showGlow = true,
    backgroundColor = colors.whiteAlpha10,
    gradientColors = [colors.primaryDark, colors.primary],
}) => {
    const clampedProgress = Math.max(0, Math.min(100, progress));

    return (
        <View style={[styles.container, { height, backgroundColor }, style]}>
            <LinearGradient
                colors={gradientColors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[
                    styles.fill,
                    {
                        width: `${clampedProgress}%`,
                        height,
                    },
                    showGlow && styles.glow,
                ]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderRadius: 9999,
        overflow: 'hidden',
    },
    fill: {
        borderRadius: 9999,
    },
    glow: {
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 5,
    },
});

export default ProgressBar;
