import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';
import { colors } from '../theme';

interface GlassPanelProps {
    children: React.ReactNode;
    style?: ViewStyle;
    intensity?: number;
    borderRadius?: number;
}

export const GlassPanel: React.FC<GlassPanelProps> = ({
    children,
    style,
    intensity = 12,
    borderRadius = 24,
}) => {
    return (
        <View style={[styles.container, { borderRadius }, style]}>
            <BlurView
                intensity={intensity}
                tint="dark"
                style={[styles.blur, { borderRadius }]}
            />
            <View style={[styles.content, { borderRadius }]}>{children}</View>
        </View>
    );
};

// Fallback for when BlurView doesn't work well
export const GlassPanelFallback: React.FC<GlassPanelProps> = ({
    children,
    style,
    borderRadius = 24,
}) => {
    return (
        <View
            style={[
                styles.fallbackContainer,
                { borderRadius },
                style,
            ]}
        >
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        position: 'relative',
    },
    blur: {
        ...StyleSheet.absoluteFillObject,
    },
    content: {
        backgroundColor: 'rgba(45, 27, 62, 0.6)',
        borderWidth: 1,
        borderColor: colors.whiteAlpha10,
    },
    fallbackContainer: {
        backgroundColor: 'rgba(45, 27, 62, 0.7)',
        borderWidth: 1,
        borderColor: colors.whiteAlpha10,
    },
});

export default GlassPanel;
