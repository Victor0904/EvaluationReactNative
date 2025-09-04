// Fallback for using MaterialIcons on Android and web.

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolWeight } from 'expo-symbols';
import { ComponentProps } from 'react';
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';

type IconMapping = Record<string, ComponentProps<typeof MaterialIcons>['name']>;
type IconSymbolName = keyof typeof MAPPING;

/**
 * Add your SF Symbols to Material Icons mappings here.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
const MAPPING = {
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
  'exclamationmark.triangle.fill': 'warning',
  'person.2.fill': 'group',
  'plus.circle.fill': 'add-circle',
  'trash.fill': 'delete',
  'location.fill': 'location-on',
  'location': 'location-on',
  'trafficlight': 'traffic',
  'road.lanes': 'road',
  'tram.fill': 'tram',
  'person.fill': 'person',
  'wrench.and.screwdriver.fill': 'build',
  'shield.fill': 'security',
  'building.2.fill': 'business',
  'flame.fill': 'local-fire-department',
  'phone.fill': 'phone',
  'phone': 'phone',
  'checkmark.circle.fill': 'check-circle',
  'chevron.left': 'chevron-left',
  'bolt.fill': 'flash-on',
  'antenna.radiowaves.left.and.right': 'wifi',
  'flame.circle.fill': 'local-fire-department',
  'drop.fill': 'water-drop',
  'building.fill': 'business',
  'sun.max.fill': 'wb-sunny',
  'moon.fill': 'nightlight-round',
  'gear': 'settings',
  'chevron.down': 'keyboard-arrow-down',
  'checkmark': 'check',
} as IconMapping;

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return <MaterialIcons color={color} size={size} name={MAPPING[name]} style={style} />;
}
