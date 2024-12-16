import Svg, { Circle } from 'react-native-svg';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '@/providers/ThemeProvider';
import { Text, View } from '@/components/Themed';
import { RichView } from '@/components/RichView';

export default function TabTwoScreen() {
  const theme = useTheme().theme;

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
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 8,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                gap: 8,
                backgroundColor: theme.colors.background,
                padding: 8,
                borderRadius: 16,
                width: '85%',
              }}
            >
              <Ionicons name="search" size={20} color="black" />
              <Text style={styles.text}>Search</Text>
            </View>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: theme.colors.tintOK }]}
              onPress={() => router.push('/two')}
            >
              <Ionicons name="add" size={20} color="black" />
            </TouchableOpacity>
          </View>
          {mokapData.map((item, index) => (
            <View key={index} style={{ alignItems: 'center', gap: 4 }}>
              <View style={styles.circleWrapper}>
                <Svg height="64" width="64">
                  <Circle cx="32" cy="32" r="32" fill={item.color} />
                </Svg>
                <Text style={styles.circleLabel}>{item.name}</Text>
              </View>
              {index < mokapData.length - 1 && (
                <View
                  style={{ height: 1, width: '80%', backgroundColor: theme.colors.secondaryText }}
                />
              )}
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
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 4,
    padding: 16,
  },
  circleWrapper: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    margin: 4,
    gap: 16,
  },
  circleLabel: {
    fontSize: 18,
    fontWeight: '400',
    color: '#2c2c32ff',
    alignContent: 'center',
    textAlignVertical: 'center',
    lineHeight: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: '400',
    color: '#2c2c32ff',
    lineHeight: 20,
  },
  button: {
    width: 36, // size of the button
    height: 36, // size of the button
    borderRadius: 30, // makes it round
    justifyContent: 'center', // center icon horizontally
    alignItems: 'center', // center icon vertically
  },
});
