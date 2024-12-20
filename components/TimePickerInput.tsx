import DateTimePicker from 'react-native-modal-datetime-picker';
import { Keyboard } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

import { View } from './Themed';
import { RichTextInput } from './RichTextInput';

import { useTheme } from '@/providers/ThemeProvider';

type TimePickerInputProps = {
  valueStart: Date | null;
  setValueStart: (value: Date) => void;
  valueEnd: Date | null;
  setValueEnd: (value: Date) => void;
};

export function TimePickerInput(props: TimePickerInputProps) {
  const { theme } = useTheme();

  const [isStartTimePickerVisible, setStartTimePickerVisible] = useState(false);
  const [isEndTimePickerVisible, setEndTimePickerVisible] = useState(false);

  const handleStartTimeConfirm = (time: Date) => {
    props.setValueStart(time);
    setStartTimePickerVisible(false);
  };

  const handleEndTimeConfirm = (time: Date) => {
    if (props.valueStart && time < props.valueStart) {
      const adjustedTime = new Date(time);
      adjustedTime.setDate(adjustedTime.getDate() + 1);
      props.setValueEnd(adjustedTime);
    } else {
      props.setValueEnd(time);
    }
    setEndTimePickerVisible(false);
  };

  return (
    <View style={{ flexDirection: 'row', width: '100%', gap: 8 }}>
      <View style={{ flex: 1 }}>
        <RichTextInput
          textInputProps={{
            placeholder: 'Čas začátku',
          }}
          value={
            props.valueStart
              ? props.valueStart.toLocaleTimeString('cs-CZ', {
                  hour: '2-digit',
                  minute: '2-digit',
                })
              : ''
          }
          setValue={props.setValueStart}
          onPress={event => {
            event.preventDefault();
            Keyboard.dismiss();
            setStartTimePickerVisible(true);
          }}
          onIconPress={() => setStartTimePickerVisible(true)}
          icon={<Ionicons name="time-outline" size={22} color={theme.colors.backgroundScroll} />}
          required
        />
      </View>
      <View style={{ width: '48%' }}>
        <RichTextInput
          textInputProps={{
            placeholder: 'Čas konce',
          }}
          value={
            props.valueEnd
              ? props.valueEnd.toLocaleTimeString('cs-CZ', {
                  hour: '2-digit',
                  minute: '2-digit',
                })
              : ''
          }
          setValue={props.setValueEnd}
          onPress={event => {
            event.preventDefault();
            Keyboard.dismiss();
            setEndTimePickerVisible(true);
          }}
          onIconPress={() => setEndTimePickerVisible(true)}
          icon={<Ionicons name="time-outline" size={22} color={theme.colors.backgroundScroll} />}
          required
        />
      </View>
      <DateTimePicker
        isVisible={isStartTimePickerVisible}
        mode="time"
        onConfirm={handleStartTimeConfirm}
        onCancel={() => setStartTimePickerVisible(false)}
      />
      <DateTimePicker
        isVisible={isEndTimePickerVisible}
        mode="time"
        onConfirm={handleEndTimeConfirm}
        onCancel={() => setEndTimePickerVisible(false)}
      />
    </View>
  );
}
