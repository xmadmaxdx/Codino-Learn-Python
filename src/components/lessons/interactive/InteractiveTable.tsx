import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../../../constants/colors';
import { FormattedText } from '../FormattedText';

interface TableRow {
    [key: string]: string;
}

interface InteractiveTableProps {
    title?: string;
    headers: string[];
    data?: any[]; // Keep for backwards compatibility
    rows?: any[]; // Alias for data
    containerStyle?: ViewStyle;
}

/**
 * A premium summary table component for data types or categorized lists.
 */
export const InteractiveTable: React.FC<InteractiveTableProps> = ({
    title,
    headers,
    data,
    rows,
    containerStyle
}) => {
    // Merge rows and data, defaulted to empty array
    const tableData = rows || data || [];

    if (!headers || headers.length === 0) return null;

    return (
        <View style={[styles.container, containerStyle]}>
            {title && <Text style={styles.title}>{title}</Text>}
            <View style={styles.tableWrapper}>
                <View style={styles.headerRow}>
                    {headers.map((header, index) => (
                        <Text key={index} style={[styles.cell, styles.headerText, { flex: 1 }]}>
                            {header.toUpperCase()}
                        </Text>
                    ))}
                </View>
                {tableData.map((row, rowIndex) => (
                    <View key={rowIndex} style={[styles.row, rowIndex === tableData.length - 1 && styles.lastRow]}>
                        {headers.map((header, colIndex) => {
                            let cellValue = '-';
                            if (Array.isArray(row)) {
                                // If row is an array, use index
                                cellValue = row[colIndex] || '-';
                            } else if (row && typeof row === 'object') {
                                // If row is an object, use header keys
                                cellValue = row[header.toLowerCase()] || row[header] || '-';
                            }

                            return (
                                <View key={colIndex} style={[styles.cell, { flex: 1 }]}>
                                    <FormattedText
                                        content={String(cellValue)}
                                        style={styles.rowText}
                                    />
                                </View>
                            );
                        })}
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.cardDark,
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: COLORS.whiteAlpha5,
        marginVertical: 12,
    },
    title: {
        color: COLORS.white,
        fontSize: 16,
        fontFamily: 'SpaceGrotesk_700Bold',
        marginBottom: 12,
    },
    tableWrapper: {
        borderRadius: 8,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: COLORS.whiteAlpha10,
    },
    headerRow: {
        flexDirection: 'row',
        backgroundColor: COLORS.whiteAlpha5,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.whiteAlpha10,
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: COLORS.whiteAlpha5,
    },
    lastRow: {
        borderBottomWidth: 0,
    },
    cell: {
        padding: 12,
        fontSize: 12,
    },
    headerText: {
        color: COLORS.primaryLight,
        fontFamily: 'SpaceGrotesk_700Bold',
        letterSpacing: 0.5,
    },
    rowText: {
        color: COLORS.gray300,
        fontFamily: 'NotoSans_400Regular',
    },
});
