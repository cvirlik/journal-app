import { StyleSheet } from 'react-native';

import { View } from './Themed';
import { Task } from './Task';
import { Hour } from './Hour';

export function Calendar() {
  const hours = [
    6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 0, 1, 2, 3, 4, 5,
  ];

  const tasks = [
    { hourStart: 8, minutesStart: 0, hourEnd: 9, minutesEnd: 0, title: 'Morning Run' },
    { hourStart: 9, minutesStart: 0, hourEnd: 9, minutesEnd: 15, title: 'Self Care' },
    { hourStart: 11, minutesStart: 10, hourEnd: 12, minutesEnd: 0, title: 'Team Meeting' },
    { hourStart: 13, minutesStart: 30, hourEnd: 15, minutesEnd: 30, title: 'Lunch Break' },
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
      {tasks.map((task, index) => (
        <Task
          key={index}
          title={task.title}
          hourIndexStart={hours.indexOf(task.hourStart)}
          minutesStart={task.minutesStart}
          hourIndexEnd={hours.indexOf(task.hourEnd)}
          minutesEnd={task.minutesEnd}
        />
      ))}
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
