import { StyleSheet } from 'react-native';
import React from 'react';

import { Text, View } from './Themed';

interface HourProps {
  hour: number;
  last: boolean;
}

export function Hour({ hour, last = false }: HourProps) {
  return (
    <View
      style={[
        styles.card,
        {
          borderBottomColor: last ? '#2c2c32' : 'transparent',
          borderTopColor: 'black ',
          borderBottomWidth: last ? 1 : 0,
        },
      ]}
    >
      <Text style={styles.text}>{hour}:00</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 8,
    paddingVertical: 16,
    backgroundColor: '#B0B2C3',
    justifyContent: 'space-between',
    flexDirection: 'column',
    borderTopWidth: 1,
    borderStyle: 'dotted',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c2c32',
  },
  container: {
    marginVertical: 16,
  },
});
