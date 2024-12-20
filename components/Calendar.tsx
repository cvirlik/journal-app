import { ScrollView, StyleSheet } from 'react-native';
import { useRef, useEffect } from 'react';

import { View } from './Themed';
import { Task } from './Task';
import { Hour } from './Hour';

import { useTheme } from '@/providers/ThemeProvider';
import { useMocapData } from '@/providers/MocapDataProviders';

export function Calendar() {
  const { data } = useMocapData();
  const { theme } = useTheme();
  const scrollViewRef = useRef<ScrollView>(null);

  const hours = Array.from({ length: 24 }, (_, i) => i);

  const getType = (hour: number): 'sunrise' | 'sun' | 'sunset' | 'moon' | null => {
    if (hour === 6) return 'sunrise';
    if (hour === 12) return 'sun';
    if (hour === 16) return 'sunset';
    if (hour === 21) return 'moon';
    return null;
  };

  useEffect(() => {
    const currentHour = new Date().getHours();
    const scrollOffset = currentHour * 60; // Assuming each hour has a height of 60
    scrollViewRef.current?.scrollTo({ y: scrollOffset, animated: true });
  }, []);

  return (
    <ScrollView
      ref={scrollViewRef}
      style={{
        borderRadius: 16,
        backgroundColor: theme.colors.backgroundScroll,
        width: '100%',
      }}
    >
      <View style={styles.container}>
        {hours.map(hour => (
          <Hour key={hour} hour={hour} last={hour === 23} type={getType(hour)} />
        ))}
        {data.tasks.map((task, index) => {
          const hourStart = task.timeStart.getHours();
          const minutesStart = task.timeStart.getMinutes();
          const hourEnd = task.timeEnd.getHours();
          const minutesEnd = task.timeEnd.getMinutes();

          return (
            <Task
              key={index}
              title={task.name}
              hourIndexStart={hours.indexOf(hourStart)}
              minutesStart={minutesStart}
              hourIndexEnd={hours.indexOf(hourEnd)}
              minutesEnd={minutesEnd}
            />
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 16,
    borderRadius: 8,
  },
});
