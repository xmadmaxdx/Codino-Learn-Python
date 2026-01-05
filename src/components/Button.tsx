import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ViewStyle,
    TextStyle,
    ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../theme';

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'ghost' | 'gradient';
    size?: 'small' | 'medium' | 'large';
    icon?: keyof typeof MaterialIcons.glyphMap;
    iconPosition?: 'left' | 'right';
    disabled?: boolean;
    loading?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
    fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    title,
    onPress,
    variant = 'primary',
    size = 'large',
    icon,
    iconPosition = 'right',
    disabled = false,
    loading = false,
    style,
    textStyle,
    fullWidth = true,
}) => {
    const getSizeStyles = () => {
        switch (size) {
            case 'small':
                return { height: 40, paddingHorizontal: 16, fontSize: 14 };
            case 'medium':
                return { height: 48, paddingHorizontal: 20, fontSize: 16 };
            case 'large':
            default:
                return { height: 56, paddingHorizontal: 32, fontSize: 18 };
        }
    };

    const sizeStyles = getSizeStyles();

    const getVariantStyles = (): { container: ViewStyle; text: TextStyle } => {
        switch (variant) {
            case 'secondary':
                return {
                    container: {
                        backgroundColor: 'transparent',
                    },
                    text: {
                        color: colors.whiteAlpha50,
                    },
                };
            case 'ghost':
                return {
                    container: {
                        backgroundColor: colors.whiteAlpha5,
                        borderWidth: 1,
                        borderColor: colors.whiteAlpha10,
                    },
                    text: {
                        color: colors.white,
                    },
                };
            case 'gradient':
            case 'primary':
            default:
                return {
                    container: {
                        backgroundColor: colors.primary,
                        shadowColor: colors.primary,
                        shadowOffset: { width: 0, height: 8 },
                        shadowOpacity: 0.4,
                        shadowRadius: 20,
                        elevation: 8,
                    },
                    text: {
                        color: colors.white,
                    },
                };
        }
    };

    const variantStyles = getVariantStyles();

    const renderContent = () => (
        <>
            {loading ? (
                <ActivityIndicator color={variantStyles.text.color} size="small" />
            ) : (
                <>
                    {icon && iconPosition === 'left' && (
                        <MaterialIcons
                            name={icon}
                            size={20}
                            color={variantStyles.text.color as string}
                            style={styles.iconLeft}
                        />
                    )}
                    <Text
                        style={[
                            styles.text,
                            { fontSize: sizeStyles.fontSize },
                            variantStyles.text,
                            textStyle,
                        ]}
                    >
                        {title}
                    </Text>
                    {icon && iconPosition === 'right' && (
                        <MaterialIcons
                            name={icon}
                            size={20}
                            color={variantStyles.text.color as string}
                            style={styles.iconRight}
                        />
                    )}
                </>
            )}
        </>
    );

    if (variant === 'gradient') {
        return (
            <TouchableOpacity
                onPress={onPress}
                disabled={disabled || loading}
                activeOpacity={0.9}
                style={[fullWidth && styles.fullWidth, style]}
            >
                <LinearGradient
                    colors={[colors.primary, '#5b0acc']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[
                        styles.container,
                        {
                            height: sizeStyles.height,
                            paddingHorizontal: sizeStyles.paddingHorizontal,
                        },
                        disabled && styles.disabled,
                    ]}
                >
                    {renderContent()}
                </LinearGradient>
            </TouchableOpacity>
        );
    }

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.8}
            style={[
                styles.container,
                {
                    height: sizeStyles.height,
                    paddingHorizontal: sizeStyles.paddingHorizontal,
                },
                variantStyles.container,
                fullWidth && styles.fullWidth,
                disabled && styles.disabled,
                style,
            ]}
        >
            {renderContent()}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 9999,
    },
    fullWidth: {
        width: '100%',
    },
    text: {
        fontFamily: 'SpaceGrotesk_700Bold',
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    iconLeft: {
        marginRight: 8,
    },
    iconRight: {
        marginLeft: 8,
    },
    disabled: {
        opacity: 0.5,
    },
});

export default Button;
