import Svg, { Circle } from 'react-native-svg';
import { StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import { RichView } from '@/components/RichView';

export default function TabTwoScreen() {
  const mokapData = [
    {
      color: 'red',
      name: 'John Doe',
    },
    {
      name: 'Jane Smith',
      color: 'blue',
    },
    {
      name: 'Mark Johnson',
      color: 'magenta',
    },
    {
      name: 'Alice Brown',
      color: 'brown',
    },
  ];
  return (
    <RichView
      primaryChildren={
        <View style={{ backgroundColor: 'transparent' }}>
          <Text style={styles.label}>Kontakty</Text>
        </View>
      }
      secondaryChildren={
        <View style={styles.circleContainer}>
          {mokapData.map((item, index) => (
            <View key={index} style={styles.circleWrapper}>
              <Svg height="100" width="100">
                <Circle cx="48" cy="48" r="48" fill={item.color} />
              </Svg>
              <Text style={styles.circleLabel}>{item.name}</Text>
            </View>
          ))}
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2c2c32ff',
    textAlign: 'center',
    alignContent: 'center',
  },
  container: {},
  circleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  circleWrapper: {
    alignItems: 'center',
    margin: 8,
  },
  circleLabel: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c2c32ff',
    textAlign: 'center',
    alignContent: 'center',
  },
});
