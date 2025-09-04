import { ContactCard } from '@/components/ContactCard';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useTheme } from '@/contexts/ThemeContext';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    FlatList,
    Linking,
    StyleSheet,
    View
} from 'react-native';
import { StorageService } from '../../services/storage';
import { Contact } from '../../types';

export default function ContactsScreen() {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const { colors } = useTheme();

    const loadContacts = async () => {
        try {
            const loadedContacts = await StorageService.getContacts();
            setContacts(loadedContacts);
        } catch (error) {
            console.error('Erreur lors du chargement des contacts:', error);
        }
    };

    useEffect(() => {
        loadContacts();
    }, []);

    const handleCall = (phone: string, name: string) => {
        Alert.alert(
            'Appeler',
            `Voulez-vous appeler ${name} au ${phone} ?`,
            [
                { text: 'Annuler', style: 'cancel' },
                {
                    text: 'Appeler',
                    onPress: () => {
                        Linking.openURL(`tel:${phone}`);
                    },
                },
            ]
        );
    };

    const renderContact = ({ item }: { item: Contact }) => (
        <ContactCard
            contact={item}
            onCall={handleCall}
        />
    );

    return (
        <ThemedView style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
                <View style={styles.titleContainer}>
                    <ThemedText type="title" style={[styles.title, { color: colors.text }]}>
                        Contacts Utiles
                    </ThemedText>
                    <ThemedText style={[styles.subtitle, { color: colors.textSecondary }]}>
                        Vos contacts de confiance pour les situations d'urgence
                    </ThemedText>
                </View>
            </View>

            {contacts.length === 0 ? (
                <ThemedView style={styles.emptyState}>
                    <IconSymbol name="person.2.fill" size={64} color={colors.textTertiary} />
                    <ThemedText type="subtitle" style={[styles.emptyTitle, { color: colors.text }]}>
                        Aucun contact enregistré
                    </ThemedText>
                    <ThemedText style={[styles.emptyDescription, { color: colors.textSecondary }]}>
                        Les contacts utiles seront affichés ici.
                        {'\n'}Ils vous aideront en cas de besoin !
                    </ThemedText>
                </ThemedView>
            ) : (
                <FlatList
                    data={contacts}
                    renderItem={renderContact}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.list}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 60,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 28, // Plus d'espace
        paddingBottom: 28, // Plus d'espace
    },
    titleContainer: {
        flex: 1,
    },
    title: {
        marginBottom: 6, // Espacement moins uniforme
        letterSpacing: -0.3, // Serrage naturel des titres
    },
    subtitle: {
        color: '#5D4037', // Couleur plus douce
        fontSize: 17, // Légèrement plus grand
        letterSpacing: 0.2, // Espacement des lettres
        lineHeight: 22, // Ligne plus espacée
    },
    list: {
        paddingHorizontal: 28, // Plus d'espace
        paddingBottom: 20, // Espace en bas
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 48, // Plus d'espace
    },
    emptyTitle: {
        marginTop: 20, // Plus d'espace
        marginBottom: 12, // Plus d'espace
        textAlign: 'center',
        letterSpacing: 0.1,
    },
    emptyDescription: {
        textAlign: 'center',
        lineHeight: 24, // Ligne plus espacée
        letterSpacing: 0.2,
    },
});
