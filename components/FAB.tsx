import { Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { View } from './Themed';

import { useTheme } from '@/providers/ThemeProvider';

type FABProps = {
  onPress: () => void;
};

export function FAB(props: FABProps) {
  const theme = useTheme().theme;
  return (
    <View style={{ position: 'relative' }}>
      <Pressable style={styles.button} onPress={props.onPress}>
        {() => (
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: theme.colors.modalBackground,
              height: 64,
              width: 64,
              borderRadius: 32,
              elevation: 10,
            }}
          >
            <Ionicons name="add" size={48} color="white" />
          </TouchableOpacity>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 90,
    right: 16,
  },
});
