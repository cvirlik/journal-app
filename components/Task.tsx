import { CheckBox } from 'react-native-elements';
import { Text, StyleSheet } from 'react-native';
import { useState } from 'react';

import { View } from './Themed';

import { useTheme } from '@/providers/ThemeProvider';
import { useMocapData } from '@/providers/MocapDataProviders';

type TaskProps = {
  title: string;
  hourIndexStart: number;
  hourIndexEnd: number;
  minutesStart: number;
  minutesEnd: number;
};
export function Task({ title, hourIndexStart, minutesStart, hourIndexEnd, minutesEnd }: TaskProps) {
  const theme = useTheme().theme;
  const { data, editItem } = useMocapData();

  const [done, setDone] = useState(false);

  const start = hourIndexStart * 60 + minutesStart;
  const end = hourIndexEnd * 60 + minutesEnd;
  const topOffset = 16 + start;
  const height = end - start >= 24 ? end - start : 'auto';

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
      <View
        style={{
          paddingVertical: 8,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <View style={{ alignSelf: 'center', flex: 1 }}>
          <Text style={styles.taskTitle}>{title}</Text>
        </View>
        <CheckBox
          checkedColor={theme.colors.tintPrimary}
          containerStyle={styles.checkboxContainer}
          wrapperStyle={styles.checkboxWrapper}
          checked={done}
          onPressIn={() => {
            const index = data.tasks.findIndex(item => item.name === title);
            editItem('tasks', index, { ...data.tasks[index], completed: !done });
            setDone(c => !c);
          }}
        />
      </View>
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
    lineHeight: 16,
    width: 'auto',
  },
  checkboxContainer: {
    borderWidth: 0,
    padding: 0,
    margin: 0,
    marginRight: 0,
  },
  checkboxWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
