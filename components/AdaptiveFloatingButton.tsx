import React from 'react';
import { Dimensions, Platform, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedText } from './ThemedText';
import { IconSymbol } from './ui/IconSymbol';

interface AdaptiveFloatingButtonProps {
    onPress: () => void;
    icon: string;
    label: string;
    color?: string;
}

export function AdaptiveFloatingButton({
    onPress,
    icon,
    label,
    color = '#007AFF'
}: AdaptiveFloatingButtonProps) {
    const insets = useSafeAreaInsets();
    const { height, width } = Dimensions.get('window');

    // Détection du type d'écran
    const isLargeScreen = height > 800; // iPhone 13 Pro Max et plus grands
    const isWideScreen = width > 400; // Écrans larges

    // Calcul de la position en fonction des zones de sécurité
    const bottomPosition = Platform.OS === 'ios'
        ? Math.max(insets.bottom + 30, 120) // Zone de sécurité iOS + marge
        : 100; // Position fixe pour Android

    const buttonSize = isLargeScreen ? 64 : 56;
    const iconSize = isLargeScreen ? 28 : 24;
    const fontSize = isLargeScreen ? 20 : 18;


    return (
        <TouchableOpacity
            style={[
                styles.fab,
                {
                    backgroundColor: color,
                    bottom: bottomPosition,
                    right: 20,
                    minHeight: buttonSize,
                    paddingHorizontal: isWideScreen ? 28 : 24,
                }
            ]}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <IconSymbol name={icon} size={iconSize} color="#fff" />
            <ThemedText style={[styles.fabLabel, { fontSize }]}>
                {label}
            </ThemedText>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 20, // Plus d'espace vertical
        paddingHorizontal: 24, // Plus d'espace horizontal
        borderRadius: 40, // Plus arrondi
        shadowColor: '#000',
        shadowOffset: {
            width: 2, // Ombre asymétrique
            height: 8, // Ombre plus prononcée
        },
        shadowOpacity: 0.4, // Ombre plus visible
        shadowRadius: 16, // Ombre plus diffuse
        elevation: 15, // Élévation plus marquée
        zIndex: 1000,
        borderWidth: 3, // Bordure plus épaisse
        borderColor: 'rgba(255, 255, 255, 0.4)', // Bordure plus visible
    },
    fabLabel: {
        marginLeft: 16, // Espacement moins uniforme
        color: '#fff',
        fontWeight: '700', // Moins gras
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 1, height: 3 }, // Ombre de texte asymétrique
        textShadowRadius: 6,
        letterSpacing: 0.8, // Espacement des lettres plus naturel
        fontSize: 18, // Taille de police plus grande
    },
});
