import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../../../constants/colors';

type DataType = 'list' | 'tuple' | 'dict' | 'set';

interface DataShapeViewerProps {
    data: any; // The actual list/dict object to visualize
    type: DataType;
    title?: string;
    containerStyle?: ViewStyle;
}

export const DataShapeViewer: React.FC<DataShapeViewerProps> = ({
    data,
    type,
    title,
    containerStyle
}) => {

    const renderListOrTuple = (items: any[], isMutable: boolean) => (
        <View style={[styles.sequenceContainer, !isMutable && styles.tupleContainer]}>
            {items.map((item, index) => (
                <View key={index} style={styles.cellWrapper}>
                    <Text style={styles.indexLabel}>{index}</Text>
                    <View style={[styles.cell, !isMutable && styles.tupleCell]}>
                        <Text style={styles.cellValue}>{JSON.stringify(item)}</Text>
                    </View>
                </View>
            ))}
        </View>
    );

    const renderDict = (obj: Record<string, any>) => (
        <View style={styles.dictContainer}>
            {Object.entries(obj).map(([key, value], index) => (
                <View key={index} style={styles.kvRow}>
                    <View style={styles.keyBox}>
                        <Text style={styles.keyText}>{JSON.stringify(key)}</Text>
                    </View>
                    <Text style={styles.arrow}>:</Text>
                    <View style={styles.valueBox}>
                        <Text style={styles.valueText}>{JSON.stringify(value)}</Text>
                    </View>
                </View>
            ))}
        </View>
    );

    return (
        <View style={[styles.container, containerStyle]}>
            {title && <Text style={styles.title}>{title || `${type} Visualization`}</Text>}

            <View style={styles.visualizationArea}>
                {/* Syntax Decorations */}
                <Text style={styles.bracket}>
                    {type === 'list' && '['}
                    {type === 'tuple' && '('}
                    {type === 'dict' && '{'}
                    {type === 'set' && '{'}
                </Text>

                <View style={styles.content}>
                    {(type === 'list' || type === 'set') && renderListOrTuple(Array.from(data), true)}
                    {type === 'tuple' && renderListOrTuple(data, false)}
                    {type === 'dict' && renderDict(data)}
                </View>

                <Text style={styles.bracket}>
                    {type === 'list' && ']'}
                    {type === 'tuple' && ')'}
                    {type === 'dict' && '}'}
                    {type === 'set' && '}'}
                </Text>
            </View>

            {/* Legend / Info */}
            <View style={styles.footer}>
                <Text style={styles.typeInfo}>
                    Type: <Text style={styles.typeBold}>{type}</Text>
                </Text>
                <Text style={styles.mutabilityInfo}>
                    {type === 'list' || type === 'dict' || type === 'set'
                        ? 'Mutable (Changeable)'
                        : 'Immutable (Fixed)'
                    }
                </Text>
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
        color: COLORS.gray400, // Matching function icon color usually
        fontSize: 12,
        fontFamily: 'SpaceGrotesk_700Bold',
        marginBottom: 12,
        textTransform: 'uppercase',
    },
    visualizationArea: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.whiteAlpha5,
        padding: 12,
        borderRadius: 12,
        overflow: 'hidden', // Contain list
    },
    bracket: {
        color: COLORS.gray500,
        fontSize: 32,
        fontFamily: 'SpaceGrotesk_700Bold',
        marginHorizontal: 4,
    },
    content: {
        flex: 1,
    },
    // List/Tuple Styles
    sequenceContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        justifyContent: 'center',
    },
    tupleContainer: {
        // Tuples look visually rounded/softer maybe?
    },
    cellWrapper: {
        alignItems: 'center',
        gap: 4,
    },
    indexLabel: {
        color: COLORS.gray500,
        fontSize: 10,
        fontFamily: 'monospace',
    },
    cell: {
        minWidth: 40,
        height: 40,
        backgroundColor: COLORS.backgroundDark,
        borderWidth: 1,
        borderColor: COLORS.primaryAlpha50,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 8,
    },
    tupleCell: {
        borderRadius: 20, // Circular for immutable vibe
        borderColor: COLORS.blue400,
        backgroundColor: 'rgba(96, 165, 250, 0.1)',
    },
    cellValue: {
        color: COLORS.white,
        fontFamily: 'monospace',
        fontSize: 14,
        fontWeight: 'bold',
    },
    // Dict Styles
    dictContainer: {
        gap: 8,
        width: '100%',
        paddingHorizontal: 8,
    },
    kvRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    keyBox: {
        backgroundColor: 'rgba(249, 115, 22, 0.1)', // Orange tint
        borderColor: COLORS.orange400,
        borderWidth: 1,
        borderRadius: 4,
        padding: 6,
        minWidth: 40,
        alignItems: 'center',
    },
    keyText: {
        color: COLORS.orange400,
        fontFamily: 'monospace',
        fontSize: 12,
    },
    arrow: {
        color: COLORS.gray500,
        fontWeight: 'bold',
    },
    valueBox: {
        backgroundColor: COLORS.backgroundDark,
        borderColor: COLORS.whiteAlpha20,
        borderWidth: 1,
        borderRadius: 4,
        padding: 6,
        minWidth: 40,
        alignItems: 'center',
    },
    valueText: {
        color: COLORS.white,
        fontFamily: 'monospace',
        fontSize: 12,
    },
    footer: {
        marginTop: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: COLORS.whiteAlpha5,
        paddingTop: 8,
    },
    typeInfo: {
        color: COLORS.gray500,
        fontSize: 11,
    },
    typeBold: {
        color: COLORS.white,
        fontWeight: 'bold',
    },
    mutabilityInfo: {
        color: COLORS.gray500,
        fontSize: 11,
        fontStyle: 'italic',
    },
});
