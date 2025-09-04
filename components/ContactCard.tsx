import { useTheme } from '@/contexts/ThemeContext';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Contact } from '../types';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { IconSymbol } from './ui/IconSymbol';

interface ContactCardProps {
    contact: Contact;
    onCall: (phone: string, name: string) => void;
}

export function ContactCard({ contact, onCall }: ContactCardProps) {
    const { colors } = useTheme();

    const getContactIcon = (role: string) => {
        const lowerRole = role.toLowerCase();
        if (lowerRole.includes('technique') || lowerRole.includes('démontage')) {
            return 'wrench.and.screwdriver.fill';
        } else if (lowerRole.includes('police')) {
            return 'shield.fill';
        } else if (lowerRole.includes('sncf') || lowerRole.includes('ferrée')) {
            return 'tram.fill';
        } else if (lowerRole.includes('préfecture') || lowerRole.includes('autorisation')) {
            return 'building.2.fill';
        } else if (lowerRole.includes('pompiers') || lowerRole.includes('urgence') || lowerRole.includes('samu')) {
            return 'flame.fill';
        } else if (lowerRole.includes('gendarmerie') || lowerRole.includes('sécurité')) {
            return 'shield.fill';
        } else if (lowerRole.includes('enedis') || lowerRole.includes('électrique')) {
            return 'bolt.fill';
        } else if (lowerRole.includes('orange') || lowerRole.includes('télécom')) {
            return 'antenna.radiowaves.left.and.right';
        } else if (lowerRole.includes('grdf') || lowerRole.includes('gaz')) {
            return 'flame.circle.fill';
        } else if (lowerRole.includes('véolia') || lowerRole.includes('eau')) {
            return 'drop.fill';
        } else if (lowerRole.includes('ddea') || lowerRole.includes('dreal') || lowerRole.includes('départementale') || lowerRole.includes('régionale')) {
            return 'building.2.fill';
        } else if (lowerRole.includes('mairie') || lowerRole.includes('municipale')) {
            return 'building.fill';
        } else if (lowerRole.includes('autoroute') || lowerRole.includes('concessionnaire')) {
            return 'road.lanes';
        } else {
            return 'person.fill';
        }
    };

    return (
        <ThemedView style={[styles.card, { backgroundColor: colors.card, borderLeftColor: colors.secondary }]}>
            <View style={styles.contactInfo}>
                <View style={styles.header}>
                    <View style={styles.titleContainer}>
                        <IconSymbol
                            name={getContactIcon(contact.role)}
                            size={20}
                            color={colors.secondary}
                        />
                        <ThemedText type="subtitle" style={[styles.name, { color: colors.text }]}>
                            {contact.name}
                        </ThemedText>
                    </View>
                    <TouchableOpacity
                        style={[styles.callButton, { backgroundColor: colors.secondary }]}
                        onPress={() => onCall(contact.phone, contact.name)}
                    >
                        <IconSymbol name="phone.fill" size={20} color={colors.buttonText} />
                    </TouchableOpacity>
                </View>

                <ThemedText style={[styles.role, { color: colors.textSecondary }]}>
                    {contact.role}
                </ThemedText>

                <View style={styles.phoneContainer}>
                    <IconSymbol name="phone" size={16} color={colors.secondary} />
                    <ThemedText style={[styles.phone, { color: colors.secondary }]}>
                        {contact.phone}
                    </ThemedText>
                </View>
            </View>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    card: {
        padding: 22, // Plus d'espace interne
        marginBottom: 20, // Espacement moins uniforme
        borderRadius: 22, // Plus arrondi
        borderLeftWidth: 6, // Bordure plus épaisse
        shadowColor: '#000',
        shadowOffset: {
            width: 3, // Ombre asymétrique
            height: 7, // Ombre plus prononcée
        },
        shadowOpacity: 0.25, // Ombre plus visible
        shadowRadius: 14, // Ombre plus diffuse
        elevation: 12, // Élévation plus marquée
        borderWidth: 1, // Bordure subtile
        borderColor: 'rgba(139, 69, 19, 0.15)', // Bordure colorée subtile
    },
    contactInfo: {
        flex: 1,
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
    name: {
        marginLeft: 10, // Espacement moins uniforme
        fontWeight: '600', // Moins gras
        flex: 1,
        letterSpacing: 0.3, // Espacement des lettres
    },
    callButton: {
        padding: 12, // Plus d'espace
        borderRadius: 24, // Plus arrondi
        marginLeft: 14, // Espacement moins uniforme
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    role: {
        marginBottom: 12, // Plus d'espace
        fontSize: 15, // Légèrement plus grand
        fontStyle: 'italic',
        letterSpacing: 0.2,
        lineHeight: 20,
    },
    phoneContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 2, // Padding vertical
    },
    phone: {
        marginLeft: 8, // Espacement moins uniforme
        fontWeight: '500', // Moins gras
        fontSize: 17, // Légèrement plus grand
        letterSpacing: 0.3,
    },
});
