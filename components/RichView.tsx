import { ScrollView, StyleSheet } from 'react-native';

import { View } from './Themed';
import type { ViewProps } from './Themed';
import { Logo } from './Logo';

type RichViewProps = ViewProps & {
  primaryChildren: React.ReactNode;
  secondaryChildren: React.ReactNode;
};
export function RichView(props: RichViewProps) {
  const TAB_BAR_HEIGHT = 80; // Adjust this value to match your TabBar's height
  return (
    <View style={[styles.container]}>
      <View style={[styles.wrapper]}>
        <Logo />
        {props.primaryChildren}
        <ScrollView
          style={{
            borderRadius: 16,
            backgroundColor: 'rgba(176, 178, 195, 0.45)',
          }}
        >
          {props.secondaryChildren}
        </ScrollView>
      </View>
      <View style={{ height: TAB_BAR_HEIGHT, backgroundColor: '#0000ff00', width: '100%' }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffffff',
    paddingTop: 16,
    flex: 1,
  },
  wrapper: {
    backgroundColor: 'transparent',
    gap: 28,
    flexDirection: 'column',
    flex: 1,
  },
});
