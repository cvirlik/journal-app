import { StyleSheet } from 'react-native';

import { View } from './Themed';
import { Hour } from './Hour';

export function Calendar() {
  const hours = Array.from({ length: 24 }, (_, index) => index); // Generate array [0, 1, ..., 23]

  return (
    <View style={styles.container}>
      {hours.map(hour => (
        <Hour key={hour} hour={hour} last={hour === 23} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#B0B2C3',
    width: '100%',
    padding: 16,
    borderRadius: 8,
  },
});
