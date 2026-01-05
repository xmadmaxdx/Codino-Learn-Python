import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../../../constants/colors';

interface InstanceAttribute {
    name: string;
    value: string;
    type?: string;
}

interface ObjectInstanceCardProps {
    instanceName: string;
    className: string;
    attributes: InstanceAttribute[];
    memoryAddress?: string; // e.g. 0x7f...
    containerStyle?: ViewStyle;
}

export const ObjectInstanceCard: React.FC<ObjectInstanceCardProps> = ({
    instanceName,
    className,
    attributes,
    memoryAddress,
    containerStyle
}) => {
    return (
        <View style={[styles.container, containerStyle]}>
            {/* Header Tag */}
            <View style={styles.headerTag}>
                <Text style={styles.headerTagText}>INSTANCE OBJECT</Text>
            </View>

            <View style={styles.cardHeader}>
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{instanceName.charAt(0)}</Text>
                </View>
                <View>
                    <Text style={styles.instanceName}>{instanceName}</Text>
                    <Text style={styles.classType}>
                        Type: <Text style={styles.classTypeBold}>{className}</Text>
                    </Text>
                </View>
                {memoryAddress && (
                    <View style={styles.memoryBadge}>
                        <Text style={styles.memoryText}>@ {memoryAddress}</Text>
                    </View>
                )}
            </View>

            <View style={styles.divider} />

            <View style={styles.attributesList}>
                {attributes.map((attr, i) => (
                    <View key={i} style={styles.attrRow}>
                        <Text style={styles.attrName}>{attr.name} =</Text>
                        <View style={styles.valueBox}>
                            <Text style={styles.valueText}>{attr.value}</Text>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.surfaceDark,
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: COLORS.primaryAlpha50,
        marginVertical: 12,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 4,
    },
    headerTag: {
        position: 'absolute',
        top: -10,
        right: 16,
        backgroundColor: COLORS.primary,
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
    },
    headerTagText: {
        color: COLORS.white,
        fontSize: 10,
        fontWeight: 'bold',
        letterSpacing: 0.5,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 16,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: COLORS.primaryAlpha20,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: COLORS.primary,
    },
    avatarText: {
        color: COLORS.primaryLight,
        fontSize: 24,
        fontFamily: 'SpaceGrotesk_700Bold',
    },
    instanceName: {
        color: COLORS.white,
        fontSize: 18,
        fontFamily: 'monospace',
        fontWeight: 'bold',
    },
    classType: {
        color: COLORS.gray500,
        fontSize: 12,
    },
    classTypeBold: {
        color: COLORS.white,
        fontWeight: 'bold',
    },
    memoryBadge: {
        marginLeft: 'auto',
        backgroundColor: COLORS.whiteAlpha5,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    memoryText: {
        color: COLORS.gray500,
        fontSize: 10,
        fontFamily: 'monospace',
    },
    divider: {
        height: 1,
        backgroundColor: COLORS.whiteAlpha5,
        marginBottom: 16,
    },
    attributesList: {
        gap: 12,
    },
    attrRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    attrName: {
        color: COLORS.gray400,
        fontFamily: 'monospace',
        fontSize: 14,
    },
    valueBox: {
        backgroundColor: COLORS.backgroundDark,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: COLORS.whiteAlpha10,
        minWidth: 60,
        alignItems: 'flex-end',
    },
    valueText: {
        color: COLORS.yellow400,
        fontFamily: 'monospace',
        fontWeight: 'bold',
    },
});
