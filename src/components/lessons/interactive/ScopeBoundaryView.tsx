import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../../../constants/colors';

interface ScopedVariable {
    name: string;
    value: string;
}

interface ScopeBoundaryViewProps {
    globalVars: ScopedVariable[];
    localVars: ScopedVariable[];
    functionName?: string; // Name of the local scope (e.g., function name)
    highlightShadow?: boolean; // Visualize shadowing if a var exists in both
    containerStyle?: ViewStyle;
}

export const ScopeBoundaryView: React.FC<ScopeBoundaryViewProps> = ({
    globalVars,
    localVars,
    functionName = 'my_function',
    highlightShadow = false,
    containerStyle
}) => {

    // Check if a variable is shadowed (exists in both scopes)
    const isShadowed = (varName: string) => {
        return highlightShadow && globalVars.some(g => g.name === varName);
    }

    return (
        <View style={[styles.container, containerStyle]}>
            {/* Global Scope Container */}
            <View style={styles.scopeContainer}>
                <View style={styles.scopeHeader}>
                    <MaterialIcons name="public" size={16} color={COLORS.blue400} />
                    <Text style={[styles.scopeTitle, { color: COLORS.blue400 }]}>Global Scope</Text>
                </View>

                <View style={styles.varsList}>
                    {globalVars.map((v, i) => (
                        <View key={i} style={styles.varBadge}>
                            <Text style={styles.varName}>{v.name}</Text>
                            <Text style={styles.varValue}>{v.value}</Text>
                        </View>
                    ))}
                    {globalVars.length === 0 && <Text style={styles.emptyText}>Empty</Text>}
                </View>

                {/* Local Scope Container (Nested visually) */}
                <View style={[styles.scopeContainer, styles.localScope]}>
                    <View style={styles.scopeHeader}>
                        <MaterialIcons name="meeting-room" size={16} color={COLORS.orange400} />
                        <Text style={[styles.scopeTitle, { color: COLORS.orange400 }]}>
                            Local Scope: <Text style={styles.funcName}>{functionName}()</Text>
                        </Text>
                    </View>

                    <View style={styles.varsList}>
                        {localVars.map((v, i) => (
                            <View key={i} style={[
                                styles.varBadge,
                                isShadowed(v.name) && styles.shadowedBadge
                            ]}>
                                <Text style={styles.varName}>{v.name}</Text>
                                <Text style={styles.varValue}>{v.value}</Text>
                                {isShadowed(v.name) && (
                                    <View style={styles.shadowIcon}>
                                        <MaterialIcons name="layers" size={10} color={COLORS.yellow400} />
                                    </View>
                                )}
                            </View>
                        ))}
                        {localVars.length === 0 && <Text style={styles.emptyText}>Empty</Text>}
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    scopeContainer: {
        backgroundColor: 'rgba(30, 41, 59, 0.5)', // Slate 800 alpha
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: COLORS.whiteAlpha10,
        position: 'relative',
    },
    localScope: {
        marginTop: 16,
        backgroundColor: 'rgba(23, 37, 84, 0.5)', // Blue 950 alpha
        borderColor: COLORS.primaryAlpha50,
        borderStyle: 'dashed',
    },
    scopeHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: 12,
    },
    scopeTitle: {
        fontSize: 12,
        fontFamily: 'SpaceGrotesk_700Bold',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    funcName: {
        fontFamily: 'monospace',
        textTransform: 'none',
    },
    varsList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    varBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.whiteAlpha5,
        borderRadius: 6,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderWidth: 1,
        borderColor: COLORS.whiteAlpha10,
        gap: 8,
    },
    shadowedBadge: {
        borderColor: COLORS.yellow400,
        backgroundColor: 'rgba(250, 204, 21, 0.1)',
    },
    varName: {
        color: COLORS.gray300,
        fontFamily: 'monospace',
        fontSize: 13,
    },
    varValue: {
        color: COLORS.white,
        fontFamily: 'monospace',
        fontWeight: 'bold',
        fontSize: 13,
    },
    shadowIcon: {
        marginLeft: 4,
    },
    emptyText: {
        color: COLORS.gray500,
        fontSize: 12,
        fontStyle: 'italic',
    },
});
