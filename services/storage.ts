import AsyncStorage from '@react-native-async-storage/async-storage';
import { Contact, Obstacle } from '../types';

const OBSTACLES_KEY = 'obstacles';
const CONTACTS_KEY = 'contacts';

export const StorageService = {
    // Obstacles
    async getObstacles(): Promise<Obstacle[]> {
        try {
            const obstacles = await AsyncStorage.getItem(OBSTACLES_KEY);
            return obstacles ? JSON.parse(obstacles) : [];
        } catch (error) {
            console.error('Erreur lors de la récupération des obstacles:', error);
            return [];
        }
    },

    async saveObstacle(obstacle: Obstacle): Promise<void> {
        try {
            const obstacles = await this.getObstacles();
            const existingIndex = obstacles.findIndex(o => o.id === obstacle.id);

            if (existingIndex >= 0) {
                obstacles[existingIndex] = obstacle;
            } else {
                obstacles.push(obstacle);
            }

            await AsyncStorage.setItem(OBSTACLES_KEY, JSON.stringify(obstacles));
        } catch (error) {
            console.error('Erreur lors de la sauvegarde de l\'obstacle:', error);
            throw error;
        }
    },

    async deleteObstacle(id: string): Promise<void> {
        try {
            const obstacles = await this.getObstacles();
            const filteredObstacles = obstacles.filter(o => o.id !== id);
            await AsyncStorage.setItem(OBSTACLES_KEY, JSON.stringify(filteredObstacles));
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'obstacle:', error);
            throw error;
        }
    },

    // Contacts (données fixes)
    async getContacts(): Promise<Contact[]> {
        try {
            const contacts = await AsyncStorage.getItem(CONTACTS_KEY);
            if (contacts) {
                return JSON.parse(contacts);
            } else {
                // Contacts par défaut
                const defaultContacts: Contact[] = [
                    {
                        id: '1',
                        name: 'Service Technique',
                        phone: '01 23 45 67 89',
                        role: 'Démontage feux tricolores'
                    },
                    {
                        id: '2',
                        name: 'Police Municipale',
                        phone: '01 23 45 67 90',
                        role: 'Coupure de routes'
                    },
                    {
                        id: '3',
                        name: 'SNCF',
                        phone: '01 23 45 67 91',
                        role: 'Traversée voies ferrées'
                    },
                    {
                        id: '4',
                        name: 'Préfecture',
                        phone: '01 23 45 67 92',
                        role: 'Autorisations spéciales'
                    },
                    {
                        id: '5',
                        name: 'Pompiers',
                        phone: '18',
                        role: 'Urgences'
                    },
                    {
                        id: '6',
                        name: 'Gendarmerie',
                        phone: '17',
                        role: 'Sécurité routière'
                    },
                    {
                        id: '7',
                        name: 'SAMU',
                        phone: '15',
                        role: 'Urgences médicales'
                    },
                    {
                        id: '8',
                        name: 'Enedis',
                        phone: '09 69 32 15 15',
                        role: 'Démontage lignes électriques'
                    },
                    {
                        id: '9',
                        name: 'Orange',
                        phone: '09 69 36 39 00',
                        role: 'Démontage lignes télécom'
                    },
                    {
                        id: '10',
                        name: 'GRDF',
                        phone: '09 69 36 35 00',
                        role: 'Démontage conduites gaz'
                    },
                    {
                        id: '11',
                        name: 'Véolia',
                        phone: '09 69 39 30 00',
                        role: 'Démontage conduites eau'
                    },
                    {
                        id: '12',
                        name: 'DDEA',
                        phone: '01 23 45 67 93',
                        role: 'Direction Départementale'
                    },
                    {
                        id: '13',
                        name: 'DREAL',
                        phone: '01 23 45 67 94',
                        role: 'Direction Régionale'
                    },
                    {
                        id: '14',
                        name: 'Mairie',
                        phone: '01 23 45 67 95',
                        role: 'Autorisations municipales'
                    },
                    {
                        id: '15',
                        name: 'Concessionnaire Autoroute',
                        phone: '01 23 45 67 96',
                        role: 'Traversée autoroute'
                    }
                ];
                await AsyncStorage.setItem(CONTACTS_KEY, JSON.stringify(defaultContacts));
                return defaultContacts;
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des contacts:', error);
            return [];
        }
    },

    // Réinitialiser les contacts (utile pour les tests)
    async resetContacts(): Promise<void> {
        try {
            await AsyncStorage.removeItem(CONTACTS_KEY);
        } catch (error) {
            console.error('Erreur lors de la réinitialisation des contacts:', error);
            throw error;
        }
    }
};
