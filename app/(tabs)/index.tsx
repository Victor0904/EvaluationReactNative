import { AdaptiveFloatingButton } from '@/components/AdaptiveFloatingButton';
import { ObstacleCard } from '@/components/ObstacleCard';
import { StatusBar } from '@/components/StatusBar';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useRefresh } from '@/contexts/RefreshContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  View
} from 'react-native';
import { StorageService } from '../../services/storage';
import { Obstacle } from '../../types';

export default function ObstaclesScreen() {
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();
  const { colors } = useTheme();
  const { refreshTrigger } = useRefresh();

  const loadObstacles = async () => {
    try {
      const loadedObstacles = await StorageService.getObstacles();
      setObstacles(loadedObstacles);
    } catch (error) {
      console.error('Erreur lors du chargement des obstacles:', error);
    }
  };

  useEffect(() => {
    loadObstacles();
  }, []);

  // Recharger la liste quand le trigger de refresh change
  useEffect(() => {
    if (refreshTrigger > 0) {
      loadObstacles();
    }
  }, [refreshTrigger]);

  // Recharger la liste quand on revient sur cet écran
  useFocusEffect(
    useCallback(() => {
      loadObstacles();
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await loadObstacles();
    setRefreshing(false);
  };

  const handleDeleteObstacle = async (id: string, title: string) => {
    try {
      await StorageService.deleteObstacle(id);
      await loadObstacles();
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de supprimer l\'obstacle');
    }
  };

  const renderObstacle = ({ item }: { item: Obstacle }) => (
    <ObstacleCard
      obstacle={item}
      onDelete={handleDeleteObstacle}
    />
  );

  const hasGpsObstacles = obstacles.some(obstacle => obstacle.latitude && obstacle.longitude);

  return (
    <ThemedView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <ThemedText type="title" style={[styles.title, { color: colors.text }]}>
            Obstacles du Parcours
          </ThemedText>
          <ThemedText style={[styles.subtitle, { color: colors.textSecondary }]}>
            {obstacles.length} obstacle{obstacles.length !== 1 ? 's' : ''} enregistré{obstacles.length !== 1 ? 's' : ''}
          </ThemedText>
        </View>
      </View>

      <StatusBar
        obstaclesCount={obstacles.length}
        hasGpsObstacles={hasGpsObstacles}
      />

      {obstacles.length === 0 ? (
        <ThemedView style={styles.emptyState}>
          <IconSymbol name="exclamationmark.triangle" size={64} color={colors.textTertiary} />
          <ThemedText type="subtitle" style={[styles.emptyTitle, { color: colors.text }]}>
            Aucun obstacle, tout roule !
          </ThemedText>
          <ThemedText style={[styles.emptyDescription, { color: colors.textSecondary }]}>
            C'est parfait ! Votre parcours est libre.
            {'\n'}Appuyez sur "Ajouter" pour signaler un obstacle si besoin.
          </ThemedText>
        </ThemedView>
      ) : (
        <FlatList
          data={obstacles}
          renderItem={renderObstacle}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}

      <AdaptiveFloatingButton
        onPress={() => router.push('/add-obstacle')}
        icon="plus.circle.fill"
        label="Ajouter"
        color="#D2691E"
      />
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
    backgroundColor: 'transparent',
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    marginBottom: 6, // Espacement moins uniforme
    letterSpacing: -0.3, // Serrage naturel des titres
  },
  subtitle: {
    fontSize: 17, // Légèrement plus grand
    letterSpacing: 0.2, // Espacement des lettres
    lineHeight: 22, // Ligne plus espacée
  },
  list: {
    paddingHorizontal: 28, // Plus d'espace
    paddingBottom: 150, // Plus d'espace pour le bouton flottant
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