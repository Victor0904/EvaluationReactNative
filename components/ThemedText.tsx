import { useTheme } from '@/contexts/ThemeContext';
import { StyleSheet, Text, type TextProps } from 'react-native';

export type ThemedTextProps = TextProps & {
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
  color?: keyof typeof import('@/constants/ThemeColors').LightColors;
};

export function ThemedText({
  style,
  color: colorKey,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const { colors } = useTheme();

  const color = colorKey ? colors[colorKey] : colors.text;

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 26, // Ligne plus espacée pour la lisibilité
    letterSpacing: 0.2, // Espacement des lettres plus naturel
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 26,
    fontWeight: '500', // Moins gras pour un look plus naturel
    letterSpacing: 0.3,
  },
  title: {
    fontSize: 30, // Légèrement plus petit
    fontWeight: '700', // Moins gras que 'bold'
    lineHeight: 36, // Plus d'espace vertical
    letterSpacing: -0.5, // Serrage naturel des titres
  },
  subtitle: {
    fontSize: 19, // Légèrement plus petit
    fontWeight: '600', // Poids intermédiaire
    letterSpacing: 0.1,
    lineHeight: 24,
  },
  link: {
    lineHeight: 28,
    fontSize: 16,
    color: '#0a7ea4',
    letterSpacing: 0.2,
    textDecorationLine: 'underline',
  },
});
