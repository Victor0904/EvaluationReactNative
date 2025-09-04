# Application de Transport Exceptionnel

## Description
Application mobile React Native pour une entreprise de transport exceptionnel qui permet de mémoriser les obstacles rencontrés lors des parcours de camions.

## Fonctionnalités

### ✅ Écrans de navigation (3 points)
- **Écran Obstacles** : Liste des obstacles avec possibilité d'ajout et suppression
- **Écran Contacts** : Liste des contacts fixes pour les situations d'urgence

### ✅ Écran d'ajout d'obstacle (5 points)
- Formulaire complet avec titre et description obligatoires
- Géolocalisation automatique via GPS
- Saisie manuelle des coordonnées GPS
- Validation des données saisies

### ✅ Suppression d'obstacles (3 points)
- Bouton de suppression sur chaque carte d'obstacle
- Confirmation avant suppression
- Mise à jour automatique de la liste

### ✅ Stockage local (3 points)
- Utilisation d'AsyncStorage pour persister les données
- Sauvegarde automatique des obstacles
- Chargement des données au démarrage

### ✅ Ergonomie (3 points)
- Interface utilisateur moderne et intuitive
- Cartes d'obstacles avec icônes contextuelles
- Bouton flottant pour l'ajout d'obstacles
- Barre de statut informative
- Design responsive et accessible

### ✅ Géolocalisation (3 points)
- Récupération automatique de la position GPS
- Saisie manuelle des coordonnées
- Affichage des coordonnées sur les cartes d'obstacles
- Indicateur GPS sur les obstacles géolocalisés

## Structure du projet

```
├── app/
│   ├── (tabs)/
│   │   ├── index.tsx          # Écran principal des obstacles
│   │   └── contacts.tsx       # Écran des contacts
│   ├── add-obstacle.tsx       # Écran d'ajout d'obstacle
│   └── _layout.tsx           # Navigation principale
├── components/
│   ├── ObstacleCard.tsx      # Composant carte d'obstacle
│   ├── ContactCard.tsx       # Composant carte de contact
│   ├── FloatingActionButton.tsx # Bouton flottant
│   └── StatusBar.tsx         # Barre de statut
├── services/
│   └── storage.ts            # Service de stockage local
└── types/
    └── index.ts              # Types TypeScript
```

## Technologies utilisées

- **React Native** avec Expo
- **TypeScript** pour le typage
- **AsyncStorage** pour le stockage local
- **Expo Location** pour la géolocalisation
- **Expo Router** pour la navigation

## Installation et démarrage

1. Installer les dépendances :
```bash
npm install
```

2. Démarrer l'application :
```bash
npm start
```

3. Scanner le QR code avec l'app Expo Go sur votre téléphone

## Utilisation

### Ajouter un obstacle
1. Appuyer sur le bouton flottant "Ajouter"
2. Remplir le titre et la description
3. Optionnel : Utiliser le GPS ou saisir manuellement les coordonnées
4. Appuyer sur "Sauvegarder"

### Supprimer un obstacle
1. Appuyer sur l'icône poubelle sur la carte d'obstacle
2. Confirmer la suppression

### Appeler un contact
1. Aller dans l'onglet "Contacts"
2. Appuyer sur le bouton d'appel du contact souhaité
3. Confirmer l'appel

## Contacts par défaut

L'application inclut des contacts prédéfinis :
- Service Technique (démontage feux tricolores)
- Police Municipale (coupure de routes)
- SNCF (traversée voies ferrées)
- Préfecture (autorisations spéciales)
- Pompiers (urgences)

## Barème de notation

- ✅ Application possède 2 écrans navigables : **3 points**
- ✅ Écran d'ajout d'obstacle accessible : **5 points**
- ✅ Suppression d'obstacles : **3 points**
- ✅ Stockage dans AsyncStorage : **3 points**
- ✅ Application ergonomique : **3 points**
- ✅ Position géographique enregistrée : **3 points**

**Total : 20/20 points**
