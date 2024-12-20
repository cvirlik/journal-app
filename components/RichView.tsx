import { ScrollView, StyleSheet } from 'react-native';

import { View } from './Themed';
import type { ViewProps } from './Themed';
import { Logo } from './Logo';

import { useTheme } from '@/providers/ThemeProvider';

type RichViewProps = ViewProps & {
  primaryChildren: React.ReactNode;
  secondaryChildren: React.ReactNode;
};
export function RichView(props: RichViewProps) {
  const theme = useTheme().theme;
  const TAB_BAR_HEIGHT = 80; // Adjust this value to match your TabBar's height
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.wrapper, { backgroundColor: theme.colors.defaultBackground }]}>
        <Logo />
        {props.primaryChildren}
        <ScrollView
          style={{
            borderRadius: 16,
            backgroundColor: theme.colors.backgroundScroll,
          }}
        >
          {props.secondaryChildren}
        </ScrollView>
      </View>
      <View style={{ height: TAB_BAR_HEIGHT, width: '100%' }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 32,
    flex: 1,
  },
  wrapper: {
    gap: 28,
    flexDirection: 'column',
    flex: 1,
  },
});
