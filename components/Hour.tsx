import { StyleSheet } from 'react-native';
import React from 'react';
import { Feather } from '@expo/vector-icons';

import { Text, View } from './Themed';

interface HourProps {
  hour: number;
  last: boolean;
  type: 'sunrise' | 'sun' | 'sunset' | 'moon' | null;
}

export function Hour({ hour, last = false, type }: HourProps) {
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
          width: '100%',
        },
      ]}
    >
      <View
        style={{
          width: 40, // Fixed width for icon container
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {type && <Feather name={type} size={24} color="black" />}
      </View>

      <View
        style={[
          styles.card,
          {
            borderBottomWidth: last ? 1 : 0,
            height: 60,
            flex: 1, // Take up remaining space
          },
        ]}
      >
        <Text style={styles.text}>{hour}:00</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 8,
    paddingVertical: 16,
    justifyContent: 'space-between',
    flexDirection: 'column',
    borderTopWidth: 1,
    borderStyle: 'dotted',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
