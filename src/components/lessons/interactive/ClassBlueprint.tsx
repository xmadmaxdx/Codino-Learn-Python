import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../../../constants/colors';

interface ClassMember {
    name: string;
    type?: string; // e.g. "String", "int" or method signature "()"
    isMethod?: boolean;
}

interface ClassBlueprintProps {
    className: string;
    description?: string;
    attributes: ClassMember[];
    methods: ClassMember[];
    containerStyle?: ViewStyle;
}

export const ClassBlueprint: React.FC<ClassBlueprintProps> = ({
    className,
    description,
    attributes,
    methods,
    containerStyle
}) => {
    return (
        <View style={[styles.container, containerStyle]}>
            {/* Grid Background Effect */}
            <View style={styles.gridBackground}>
                {/* CSS Grid pattern simulation would go here, simplified as opacity wash */}
            </View>

            <View style={styles.header}>
                <View style={styles.iconBadge}>
                    <MaterialIcons name="architecture" size={20} color={COLORS.white} />
                </View>
                <View>
                    <Text style={styles.subtitle}>BLUEPRINT</Text>
                    <Text style={styles.title}>class {className}:</Text>
                </View>
            </View>

            {description && (
                <Text style={styles.description}>"{description}"</Text>
            )}

            <View style={styles.section}>
                <Text style={styles.sectionHeader}>Attributes (Data)</Text>
                <View style={styles.memberList}>
                    {attributes.map((attr, i) => (
                        <View key={i} style={styles.memberRow}>
                            <MaterialIcons name="lens" size={8} color={COLORS.orange400} />
                            <Text style={styles.memberName}>{attr.name}</Text>
                            <Text style={styles.memberType}>{attr.type}</Text>
                        </View>
                    ))}
                    {attributes.length === 0 && <Text style={styles.emptyText}>None</Text>}
                </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.section}>
                <Text style={styles.sectionHeader}>Methods (Actions)</Text>
                <View style={styles.memberList}>
                    {methods.map((method, i) => (
                        <View key={i} style={styles.memberRow}>
                            <MaterialIcons name="settings" size={12} color={COLORS.blue400} />
                            <Text style={styles.memberName}>{method.name}()</Text>
                            <Text style={styles.memberType}>{method.type}</Text>
                        </View>
                    ))}
                    {methods.length === 0 && <Text style={styles.emptyText}>None</Text>}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1e3a8a', // Deep Blueprint Blue
        borderRadius: 4,
        padding: 20,
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.2)',
        marginVertical: 12,
        position: 'relative',
        overflow: 'hidden',
        borderStyle: 'solid',
    },
    gridBackground: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#172554', // Darker blue
        opacity: 0.5,
        zIndex: -1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 8,
    },
    iconBadge: {
        width: 40,
        height: 40,
        borderRadius: 8,
        backgroundColor: 'rgba(255,255,255,0.1)',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
    },
    subtitle: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: 10,
        fontFamily: 'SpaceGrotesk_700Bold',
        letterSpacing: 2,
    },
    title: {
        color: COLORS.white,
        fontSize: 20,
        fontFamily: 'monospace',
        fontWeight: 'bold',
    },
    description: {
        color: 'rgba(255,255,255,0.7)',
        fontStyle: 'italic',
        fontSize: 12,
        marginBottom: 16,
    },
    section: {
        marginTop: 12,
    },
    sectionHeader: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 11,
        textTransform: 'uppercase',
        marginBottom: 8,
        fontFamily: 'SpaceGrotesk_700Bold',
    },
    memberList: {
        gap: 8,
        paddingLeft: 8,
    },
    memberRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    memberName: {
        color: COLORS.white,
        fontFamily: 'monospace',
        fontSize: 14,
    },
    memberType: {
        color: 'rgba(255,255,255,0.5)',
        fontFamily: 'monospace',
        fontSize: 12,
        marginLeft: 'auto',
    },
    divider: {
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.1)',
        marginVertical: 12,
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)', // Dashed line trick requires view border
    },
    emptyText: {
        color: 'rgba(255,255,255,0.3)',
        fontSize: 12,
        fontStyle: 'italic',
    },
});
