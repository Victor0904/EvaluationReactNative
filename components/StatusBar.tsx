import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { IconSymbol } from './ui/IconSymbol';

interface StatusBarProps {
    obstaclesCount: number;
    hasGpsObstacles: boolean;
}

export function StatusBar({ obstaclesCount, hasGpsObstacles }: StatusBarProps) {
    return (
        <ThemedView style={styles.container}>
            <View style={styles.stat}>
                <IconSymbol name="exclamationmark.triangle.fill" size={16} color="#ff6b6b" />
                <ThemedText style={styles.statText}>
                    {obstaclesCount} obstacle{obstaclesCount !== 1 ? 's' : ''}
                </ThemedText>
            </View>

            {hasGpsObstacles && (
                <View style={styles.stat}>
                    <IconSymbol name="location.fill" size={16} color="#007AFF" />
                    <ThemedText style={styles.statText}>GPS activé</ThemedText>
                </View>
            )}

            <View style={styles.stat}>
                <IconSymbol name="wifi.slash" size={16} color="#28a745" />
                <ThemedText style={styles.statText}>Hors ligne</ThemedText>
            </View>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 16,
        paddingHorizontal: 24,
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderRadius: 16,
        marginHorizontal: 24,
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 6,
    },
    stat: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statText: {
        marginLeft: 6,
        fontSize: 12,
        color: '#666',
        fontWeight: '500',
    },
});
