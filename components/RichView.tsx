import { ScrollView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { Text, View } from './Themed';
import type { ViewProps } from './Themed';
import { Logo } from './Logo';

import { useTheme } from '@/providers/ThemeProvider';

type RichViewProps = ViewProps & {
  title?: string;
  children?: React.ReactNode;
  withScrollContainer?: boolean;
  tab?: boolean;
};
export function RichView({
  title,
  children,
  withScrollContainer = true,
  tab = true,
}: RichViewProps) {
  const theme = useTheme().theme;
  const TAB_BAR_HEIGHT = 80; // Adjust this value to match your TabBar's height
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.wrapper, { backgroundColor: theme.colors.defaultBackground }]}>
        <Logo />
        <View
          style={{
            backgroundColor: 'transparent',
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 32,
            paddingVertical: 16,
          }}
        >
          <Text style={styles.label}>{title}</Text>
        </View>
        {withScrollContainer ? (
          <ScrollView
            style={{
              marginTop: 32,
              borderRadius: 16,
              backgroundColor: theme.colors.backgroundScroll,
            }}
          >
            <View style={{ gap: 8 }}>{children}</View>
          </ScrollView>
        ) : (
          <View style={{ gap: 8, flex: 1 }}>{children}</View>
        )}
      </View>
      {tab && <View style={{ height: TAB_BAR_HEIGHT, width: '100%' }} />}
      <StatusBar style="dark" backgroundColor="transparent" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 48,
    flex: 1,
  },
  wrapper: {
    flexDirection: 'column',
    flex: 1,
  },
  label: {
    fontSize: 32,
    lineHeight: 32,
    textAlignVertical: 'center',
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    alignContent: 'center',
  },
});
