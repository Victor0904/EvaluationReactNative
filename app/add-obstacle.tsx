import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useRefresh } from '@/contexts/RefreshContext';
import { useTheme } from '@/contexts/ThemeContext';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { StorageService } from '../services/storage';
import { Obstacle } from '../types';

export default function AddObstacleScreen() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { colors } = useTheme();
    const { triggerRefresh } = useRefresh();

    const getCurrentLocation = async () => {
        try {
            setIsLoading(true);

            // Demander les permissions
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert(
                    'Permission refusée',
                    'L\'accès à la localisation est nécessaire pour obtenir vos coordonnées.'
                );
                return;
            }

            // Obtenir la position actuelle
            const location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.High,
            });

            setLatitude(location.coords.latitude.toString());
            setLongitude(location.coords.longitude.toString());


        } catch (error) {
            console.error('Erreur lors de la récupération de la position:', error);
            Alert.alert('Erreur', 'Impossible de récupérer votre position actuelle.');
        } finally {
            setIsLoading(false);
        }
    };

    const validateForm = () => {
        if (!title.trim()) {
            Alert.alert('Erreur', 'Le titre est obligatoire');
            return false;
        }
        if (!description.trim()) {
            Alert.alert('Erreur', 'La description est obligatoire');
            return false;
        }
        if (latitude && longitude) {
            const lat = parseFloat(latitude);
            const lng = parseFloat(longitude);
            if (isNaN(lat) || isNaN(lng) || lat < -90 || lat > 90 || lng < -180 || lng > 180) {
                Alert.alert('Erreur', 'Coordonnées GPS invalides');
                return false;
            }
        }
        return true;
    };

    const handleSave = async () => {
        if (!validateForm()) return;

        try {
            setIsLoading(true);

            const obstacle: Obstacle = {
                id: Date.now().toString(),
                title: title.trim(),
                description: description.trim(),
                latitude: latitude ? parseFloat(latitude) : undefined,
                longitude: longitude ? parseFloat(longitude) : undefined,
                createdAt: new Date(),
            };

            await StorageService.saveObstacle(obstacle);

            // Déclencher le rechargement de la liste
            triggerRefresh();

            // Retourner directement à la liste
            router.back();
        } catch (error) {
            console.error('Erreur lors de la sauvegarde:', error);
            Alert.alert('Erreur', 'Impossible de sauvegarder l\'obstacle');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ThemedView style={[styles.container, { backgroundColor: colors.background }]}>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => router.back()}
                    >
                        <IconSymbol name="chevron.left" size={24} color={colors.primary} />
                        <ThemedText style={[styles.backText, { color: colors.primary }]}>Retour</ThemedText>
                    </TouchableOpacity>
                    <ThemedText type="title" style={[styles.title, { color: colors.text }]}>
                        Nouvel Obstacle
                    </ThemedText>
                </View>

                <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                    <ThemedView style={styles.form}>
                        <View style={styles.inputGroup}>
                            <ThemedText style={[styles.label, { color: colors.text }]}>Titre *</ThemedText>
                            <TextInput
                                style={[styles.input, {
                                    backgroundColor: colors.card,
                                    borderColor: colors.border,
                                    color: colors.text
                                }]}
                                value={title}
                                onChangeText={setTitle}
                                placeholder="Ex: Feu tricolore à démonter"
                                placeholderTextColor={colors.textTertiary}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <ThemedText style={[styles.label, { color: colors.text }]}>Description *</ThemedText>
                            <TextInput
                                style={[styles.input, styles.textArea, {
                                    backgroundColor: colors.card,
                                    borderColor: colors.border,
                                    color: colors.text
                                }]}
                                value={description}
                                onChangeText={setDescription}
                                placeholder="Décrivez l'obstacle en détail..."
                                placeholderTextColor={colors.textTertiary}
                                multiline
                                numberOfLines={4}
                                textAlignVertical="top"
                            />
                        </View>

                        <View style={[styles.coordinatesSection, { backgroundColor: colors.surface }]}>
                            <ThemedText type="subtitle" style={[styles.sectionTitle, { color: colors.text }]}>
                                Coordonnées GPS (optionnel)
                            </ThemedText>

                            <TouchableOpacity
                                style={[styles.gpsButton, { backgroundColor: colors.primary + '20' }]}
                                onPress={getCurrentLocation}
                                disabled={isLoading}
                            >
                                <IconSymbol
                                    name="location.fill"
                                    size={20}
                                    color={isLoading ? colors.textTertiary : colors.primary}
                                />
                                <ThemedText style={[
                                    styles.gpsButtonText,
                                    { color: isLoading ? colors.textTertiary : colors.primary }
                                ]}>
                                    {isLoading ? 'Récupération...' : 'Utiliser ma position actuelle'}
                                </ThemedText>
                            </TouchableOpacity>

                            <View style={styles.coordinatesInputs}>
                                <View style={styles.coordinateInput}>
                                    <ThemedText style={[styles.label, { color: colors.text }]}>Latitude</ThemedText>
                                    <TextInput
                                        style={[styles.input, {
                                            backgroundColor: colors.card,
                                            borderColor: colors.border,
                                            color: colors.text
                                        }]}
                                        value={latitude}
                                        onChangeText={setLatitude}
                                        placeholder="48.8566"
                                        placeholderTextColor={colors.textTertiary}
                                        keyboardType="numeric"
                                    />
                                </View>
                                <View style={styles.coordinateInput}>
                                    <ThemedText style={[styles.label, { color: colors.text }]}>Longitude</ThemedText>
                                    <TextInput
                                        style={[styles.input, {
                                            backgroundColor: colors.card,
                                            borderColor: colors.border,
                                            color: colors.text
                                        }]}
                                        value={longitude}
                                        onChangeText={setLongitude}
                                        placeholder="2.3522"
                                        placeholderTextColor={colors.textTertiary}
                                        keyboardType="numeric"
                                    />
                                </View>
                            </View>
                        </View>
                    </ThemedView>
                </ScrollView>

                <View style={[styles.footer, { borderTopColor: colors.border }]}>
                    <TouchableOpacity
                        style={[
                            styles.saveButton,
                            { backgroundColor: isLoading ? colors.textTertiary : colors.primary },
                            isLoading && styles.disabledButton
                        ]}
                        onPress={handleSave}
                        disabled={isLoading}
                    >
                        <IconSymbol name="checkmark.circle.fill" size={20} color="#fff" />
                        <ThemedText style={styles.saveButtonText}>
                            {isLoading ? 'Sauvegarde...' : 'Sauvegarder'}
                        </ThemedText>
                    </TouchableOpacity>
                </View>
            </ThemedView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 60,
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 16,
    },
    backText: {
        marginLeft: 4,
        fontSize: 16,
    },
    title: {
        flex: 1,
    },
    content: {
        flex: 1,
    },
    form: {
        padding: 20,
    },
    inputGroup: {
        marginBottom: 22, // Espacement moins uniforme
    },
    label: {
        fontSize: 17, // Légèrement plus grand
        fontWeight: '500', // Moins gras
        marginBottom: 10, // Plus d'espace
        letterSpacing: 0.3, // Espacement des lettres
        color: '#5D4037', // Couleur plus douce
    },
    input: {
        borderWidth: 2,
        borderRadius: 16, // Plus arrondi
        padding: 18, // Plus d'espace interne
        fontSize: 17, // Légèrement plus grand
        fontWeight: '400', // Moins gras
        letterSpacing: 0.3, // Espacement des lettres
        lineHeight: 24, // Ligne plus espacée
    },
    textArea: {
        height: 110, // Légèrement plus haut
        textAlignVertical: 'top', // Alignement du texte
    },
    coordinatesSection: {
        marginTop: 24, // Plus d'espace
        padding: 20, // Plus d'espace interne
        borderRadius: 16, // Plus arrondi
        borderWidth: 1, // Bordure subtile
        borderColor: 'rgba(139, 69, 19, 0.1)', // Bordure colorée subtile
    },
    sectionTitle: {
        marginBottom: 20, // Plus d'espace
        letterSpacing: 0.2, // Espacement des lettres
    },
    gpsButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16, // Plus d'espace
        borderRadius: 12, // Plus arrondi
        marginBottom: 20, // Plus d'espace
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    gpsButtonText: {
        marginLeft: 10, // Espacement moins uniforme
        fontWeight: '500', // Moins gras
        letterSpacing: 0.3,
    },
    coordinatesInputs: {
        flexDirection: 'row',
        gap: 16, // Plus d'espace entre les champs
    },
    coordinateInput: {
        flex: 1,
    },
    footer: {
        padding: 20,
        borderTopWidth: 1,
    },
    saveButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 22, // Plus d'espace
        borderRadius: 20, // Plus arrondi
        shadowColor: '#000',
        shadowOffset: {
            width: 2, // Ombre asymétrique
            height: 6, // Ombre plus prononcée
        },
        shadowOpacity: 0.3, // Ombre plus visible
        shadowRadius: 12, // Ombre plus diffuse
        elevation: 10, // Élévation plus marquée
        borderWidth: 2, // Bordure
        borderColor: 'rgba(255, 255, 255, 0.2)', // Bordure subtile
    },
    disabledButton: {
        opacity: 0.5, // Moins d'opacité pour un effet plus naturel
    },
    saveButtonText: {
        marginLeft: 12, // Espacement moins uniforme
        color: '#fff',
        fontSize: 19, // Légèrement plus grand
        fontWeight: '600', // Moins gras
        letterSpacing: 0.8, // Espacement des lettres plus naturel
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
});
