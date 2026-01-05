import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../../../constants/colors';

interface VariableState {
    name: string;
    value: string;
    type: string;
    isChanged?: boolean; // Highlight if changed
}

interface StateSnapshotProps {
    variables: VariableState[];
    title?: string;
    containerStyle?: ViewStyle;
}

export const StateSnapshot: React.FC<StateSnapshotProps> = ({
    variables,
    title = 'Current State',
    containerStyle
}) => {
    return (
        <View style={[styles.container, containerStyle]}>
            <View style={styles.header}>
                <MaterialIcons name="camera-alt" size={18} color={COLORS.orange400} />
                <Text style={styles.title}>{title}</Text>
            </View>

            <View style={styles.table}>
                {/* Table Header */}
                <View style={[styles.row, styles.headerRow]}>
                    <Text style={[styles.cell, styles.colName]}>Variable</Text>
                    <Text style={[styles.cell, styles.colValue]}>Value</Text>
                    <Text style={[styles.cell, styles.colType]}>Type</Text>
                </View>

                {/* Table Body */}
                {variables.map((v, index) => (
                    <View
                        key={index}
                        style={[
                            styles.row,
                            index !== variables.length - 1 && styles.rowBorder,
                            v.isChanged && styles.rowHighlight
                        ]}
                    >
                        <Text style={[styles.cell, styles.colNameText]}>{v.name}</Text>

                        <View style={[styles.cell, styles.colValue]}>
                            <View style={[
                                styles.valueTag,
                                v.isChanged && styles.valueTagChanged
                            ]}>
                                <Text style={styles.valueText}>{v.value}</Text>
                            </View>
                        </View>

                        <Text style={[styles.cell, styles.colTypeText]}>{v.type}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#20162a', // Slightly lighter than background
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: COLORS.whiteAlpha5,
        marginVertical: 12,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 16,
        paddingHorizontal: 4,
    },
    title: {
        color: COLORS.orange400,
        fontSize: 14,
        fontFamily: 'SpaceGrotesk_700Bold',
        letterSpacing: 0.5,
        textTransform: 'uppercase',
    },
    table: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderRadius: 12,
        overflow: 'hidden',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 12,
    },
    headerRow: {
        backgroundColor: COLORS.whiteAlpha5,
        paddingVertical: 8,
    },
    rowBorder: {
        borderBottomWidth: 1,
        borderBottomColor: COLORS.whiteAlpha5,
    },
    rowHighlight: {
        backgroundColor: 'rgba(234, 179, 8, 0.05)', // Yellow tint for changed
    },
    cell: {
        // base cell style
    },
    colName: {
        flex: 1,
        color: COLORS.gray500,
        fontSize: 11,
        fontFamily: 'SpaceGrotesk_700Bold',
        textTransform: 'uppercase',
    },
    colValue: {
        flex: 1.5,
        color: COLORS.gray500,
        fontSize: 11,
        fontFamily: 'SpaceGrotesk_700Bold',
        textTransform: 'uppercase',
    },
    colType: {
        flex: 0.8,
        color: COLORS.gray500,
        fontSize: 11,
        fontFamily: 'SpaceGrotesk_700Bold',
        textTransform: 'uppercase',
        textAlign: 'right',
    },
    // Cell Content
    colNameText: {
        flex: 1,
        color: COLORS.white,
        fontFamily: 'monospace',
        fontSize: 13,
        fontWeight: 'bold',
    },
    colTypeText: {
        flex: 0.8,
        color: COLORS.gray400,
        fontFamily: 'NotoSans_400Regular',
        fontSize: 12,
        textAlign: 'right',
        fontStyle: 'italic',
    },
    valueTag: {
        alignSelf: 'flex-start',
        backgroundColor: COLORS.whiteAlpha10,
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
    },
    valueTagChanged: {
        backgroundColor: 'rgba(234, 179, 8, 0.15)', // Yellow bg
        borderWidth: 1,
        borderColor: 'rgba(234, 179, 8, 0.3)',
    },
    valueText: {
        color: '#e2e8f0',
        fontFamily: 'SpaceGrotesk_500Medium',
        fontSize: 13,
    },
});
