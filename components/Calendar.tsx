import { StyleSheet } from 'react-native';

import { View } from './Themed';
import { Task } from './Task';
import { Hour } from './Hour';

import { useMocapData } from '@/providers/MocapDataProviders';

export function Calendar() {
  const { data } = useMocapData();

  const hours = [
    6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 0, 1, 2, 3, 4, 5,
  ];

  const getType = (hour: number): 'sunrise' | 'sun' | 'sunset' | 'moon' | null => {
    if (hour === 6) return 'sunrise';
    if (hour === 12) return 'sun';
    if (hour === 16) return 'sunset';
    if (hour === 21) return 'moon';
    return null;
  };

  return (
    <View style={styles.container}>
      {hours.map(hour => (
        <Hour key={hour} hour={hour} last={hour === 5} type={getType(hour)} />
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
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 16,
    borderRadius: 8,
  },
});
