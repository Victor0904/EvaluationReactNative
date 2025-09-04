import { useTheme } from '@/contexts/ThemeContext';
import { View, type ViewProps } from 'react-native';

export type ThemedViewProps = ViewProps & {
  backgroundColor?: keyof typeof import('@/constants/ThemeColors').LightColors;
};

export function ThemedView({
  style,
  backgroundColor: backgroundColorKey,
  ...otherProps
}: ThemedViewProps) {
  const { colors } = useTheme();

  const backgroundColor = backgroundColorKey ? colors[backgroundColorKey] : colors.background;

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
