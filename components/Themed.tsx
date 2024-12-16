// eslint-disable-next-line no-restricted-imports
import { Text as DefaultText, View as DefaultView } from 'react-native';

import { useTheme } from '@/providers/ThemeProvider';

export type TextProps = DefaultText['props'];
export type ViewProps = DefaultView['props'];
export function Text(props: TextProps) {
  const theme = useTheme().theme;
  const { style, ...otherProps } = props;
  const color = theme.colors.text;

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const theme = useTheme().theme;
  const { style, ...otherProps } = props;
  const backgroundColor = theme.colors.defaultBackground;

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}
