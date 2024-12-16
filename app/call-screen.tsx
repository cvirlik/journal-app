import Svg, { Circle } from 'react-native-svg';
import Animated, { Easing, FadeIn } from 'react-native-reanimated';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { Feather, Ionicons } from '@expo/vector-icons';

import { useTheme } from '@/providers/ThemeProvider';
import { useSelectedUser } from '@/providers/SelectedUserProvider';
import { Text, View } from '@/components/Themed';

export default function CallScreen() {
  const theme = useTheme().theme;
  const { profile } = useSelectedUser();

  const [time, setTime] = useState(0); // Time in seconds

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime: number) => prevTime + 1);
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <Animated.View
      entering={FadeIn.duration(300).easing(Easing.inOut(Easing.quad))}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.tintPrimary,
        paddingHorizontal: 32,
      }}
    >
      <View style={{ flexDirection: 'column', gap: 32, alignItems: 'center', width: '100%' }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Svg height="100" width="100">
            <Circle cx="48" cy="48" r="48" fill="pink" />
          </Svg>
          <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 32 }}>{profile?.name}</Text>
          <Text style={{ color: 'white', fontSize: 24 }}>volám</Text>
          <Text style={styles.timerText}>
            {minutes}:{seconds.toString().padStart(2, '0')}
          </Text>
        </View>
        <View
          style={{
            gap: 32,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
              paddingHorizontal: 32,
            }}
          >
            <Ionicons name="volume-medium" size={42} color="white" />
            <Ionicons name="pause" size={42} color="white" />
            <Ionicons name="keypad" size={42} color="white" />
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
              paddingHorizontal: 32,
            }}
          >
            <Ionicons name="videocam" size={42} color="white" />
            <Ionicons name="add-circle" size={42} color="white" />
            <Ionicons name="mic" size={42} color="white" />
          </View>
        </View>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.colors.tintError }]}
          onPress={() => router.push('/two')}
        >
          <Feather name="phone-off" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 60, // size of the button
    height: 60, // size of the button
    borderRadius: 30, // makes it round
    justifyContent: 'center', // center icon horizontally
    alignItems: 'center', // center icon vertically
  },
  timerText: {
    fontSize: 20,
    color: 'white',
    marginTop: 8,
  },
});
