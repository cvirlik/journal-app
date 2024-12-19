import { StyleSheet } from 'react-native';
import type { ViewProps } from 'react-native';

import { View } from './Themed';

import { useTheme } from '@/providers/ThemeProvider';

export function Separator(props: ViewProps) {
  const theme = useTheme().theme;

  return (
    <View style={[props.style, { alignItems: 'center', width: '100%' }]}>
      <View style={[styles.separator, { backgroundColor: theme.colors.backgroundScroll }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  separator: {
    height: 1,
    width: '100%',
  },
});
