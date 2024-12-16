import { Text, StyleSheet } from 'react-native';

import { View } from './Themed';

import { useTheme } from '@/providers/ThemeProvider';

type TaskProps = {
  title: string;
  hourIndexStart: number;
  hourIndexEnd: number;
  minutesStart: number;
  minutesEnd: number;
};
export function Task({ title, hourIndexStart, minutesStart, hourIndexEnd, minutesEnd }: TaskProps) {
  const theme = useTheme().theme;

  const start = hourIndexStart * 60 + minutesStart;
  const end = hourIndexEnd * 60 + minutesEnd;
  const topOffset = 16 + start;
  const height = end - start >= 22 ? end - start : 'auto';

  return (
    <View
      style={[
        styles.task,
        {
          top: topOffset,
          left: 32 + 16 + 8 + 32 + 32,
          height,
          borderColor: theme.colors.backgroundScroll,
          borderWidth: 1,
        },
      ]}
    >
      <Text style={styles.taskTitle}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  task: {
    position: 'absolute',
    left: 16,
    right: 16,
    paddingVertical: 2,
    paddingHorizontal: 6,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 5,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
