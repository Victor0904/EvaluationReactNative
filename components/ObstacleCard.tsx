import { useTheme } from '@/contexts/ThemeContext';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Obstacle } from '../types';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { IconSymbol } from './ui/IconSymbol';

interface ObstacleCardProps {
    obstacle: Obstacle;
    onDelete: (id: string, title: string) => void;
}

export function ObstacleCard({ obstacle, onDelete }: ObstacleCardProps) {
    const { colors } = useTheme();

    const getObstacleIcon = (title: string) => {
        const lowerTitle = title.toLowerCase();
        if (lowerTitle.includes('feu') || lowerTitle.includes('tricolore')) {
            return 'trafficlight';
        } else if (lowerTitle.includes('route') || lowerTitle.includes('coupure')) {
            return 'road.lanes';
        } else if (lowerTitle.includes('ferrée') || lowerTitle.includes('train')) {
            return 'tram.fill';
        } else if (lowerTitle.includes('personne') || lowerTitle.includes('contact')) {
            return 'person.fill';
        } else {
            return 'exclamationmark.triangle.fill';
        }
    };

    return (
        <ThemedView style={[styles.card, { backgroundColor: colors.card, borderLeftColor: colors.secondary }]}>
            <View style={styles.header}>
                <View style={styles.titleContainer}>
                    <IconSymbol
                        name={getObstacleIcon(obstacle.title)}
                        size={20}
                        color={colors.secondary}
                    />
                    <ThemedText type="subtitle" style={[styles.title, { color: colors.text }]}>
                        {obstacle.title}
                    </ThemedText>
                </View>
                <TouchableOpacity
                    onPress={() => onDelete(obstacle.id, obstacle.title)}
                    style={[styles.deleteButton, { backgroundColor: colors.error + '20' }]}
                >
                    <IconSymbol name="trash.fill" size={18} color={colors.error} />
                </TouchableOpacity>
            </View>

            <ThemedText style={[styles.description, { color: colors.text }]}>
                {obstacle.description}
            </ThemedText>

            {obstacle.latitude && obstacle.longitude && (
                <View style={styles.coordinatesContainer}>
                    <IconSymbol name="location.fill" size={14} color={colors.textSecondary} />
                    <ThemedText style={[styles.coordinates, { color: colors.textSecondary }]}>
                        {obstacle.latitude.toFixed(6)}, {obstacle.longitude.toFixed(6)}
                    </ThemedText>
                </View>
            )}

            <View style={styles.footer}>
                <ThemedText style={[styles.date, { color: colors.textTertiary }]}>
                    Créé le {new Date(obstacle.createdAt).toLocaleDateString('fr-FR')}
                </ThemedText>
                {obstacle.latitude && obstacle.longitude && (
                    <View style={[styles.locationBadge, { backgroundColor: colors.primary + '20' }]}>
                        <IconSymbol name="location" size={12} color={colors.primary} />
                        <ThemedText style={[styles.locationText, { color: colors.primary }]}>GPS</ThemedText>
                    </View>
                )}
            </View>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    card: {
        padding: 22, // Espacement moins uniforme
        marginBottom: 20, // Espacement moins uniforme
        borderRadius: 22, // Bordures moins parfaites
        borderLeftWidth: 6, // Bordure plus épaisse
        shadowColor: '#000',
        shadowOffset: {
            width: 3, // Ombre plus asymétrique
            height: 7, // Ombre plus prononcée
        },
        shadowOpacity: 0.25, // Ombre plus visible
        shadowRadius: 14, // Ombre plus diffuse
        elevation: 12, // Élévation plus marquée
        transform: [{ scale: 1 }],
        borderWidth: 1, // Bordure subtile
        borderColor: 'rgba(139, 69, 19, 0.15)', // Bordure colorée plus visible
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12, // Plus d'espace
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    title: {
        marginLeft: 10, // Espacement moins uniforme
        fontWeight: '600', // Moins gras
        flex: 1,
        letterSpacing: 0.3, // Espacement des lettres
    },
    deleteButton: {
        padding: 12, // Plus d'espace
        borderRadius: 28, // Plus arrondi
        minWidth: 44, // Légèrement plus grand
        minHeight: 44,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 1,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    description: {
        marginBottom: 16, // Plus d'espace
        lineHeight: 24, // Ligne plus espacée
        letterSpacing: 0.2,
    },
    coordinatesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12, // Plus d'espace
        paddingVertical: 4, // Padding vertical
    },
    coordinates: {
        marginLeft: 6, // Espacement moins uniforme
        fontSize: 13, // Légèrement plus grand
        fontFamily: 'monospace',
        letterSpacing: 0.5, // Espacement des lettres
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 4, // Padding supplémentaire
    },
    date: {
        fontSize: 13, // Légèrement plus grand
        letterSpacing: 0.2,
        fontStyle: 'italic', // Style plus naturel
    },
    locationBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 14, // Plus d'espace
        paddingVertical: 8, // Plus d'espace
        borderRadius: 24, // Plus arrondi
        borderWidth: 1,
        borderColor: 'transparent',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    locationText: {
        marginLeft: 6, // Espacement moins uniforme
        fontSize: 11, // Légèrement plus grand
        fontWeight: '500', // Moins gras
        letterSpacing: 0.3,
    },
});
