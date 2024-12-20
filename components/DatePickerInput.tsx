import DateTimePicker from 'react-native-modal-datetime-picker';
import { Keyboard } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

import { View } from './Themed';
import { RichTextInput } from './RichTextInput';

import { useTheme } from '@/providers/ThemeProvider';

type DatePickerInputProps = {
  value: Date | null;
  setValue: (value: Date) => void;
};

export function DatePickerInput(props: DatePickerInputProps) {
  const { theme } = useTheme();

  // Date and Time Picker States
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const handleDateConfirm = (d: Date) => {
    props.setValue(d);
    setDatePickerVisible(false);
  };

  return (
    <>
      <View>
        <RichTextInput
          textInputProps={{
            placeholder: 'Datum',
          }}
          value={props.value?.toLocaleDateString() || ''}
          setValue={props.setValue}
          onPress={event => {
            event.preventDefault();
            Keyboard.dismiss();
            setDatePickerVisible(true);
          }}
          onIconPress={() => setDatePickerVisible(true)}
          icon={<Ionicons name="calendar" size={20} color={theme.colors.backgroundScroll} />}
          required
        />
      </View>

      <DateTimePicker
        isVisible={isDatePickerVisible}
        mode="date"
        locale="cs_CZ"
        onConfirm={handleDateConfirm}
        onCancel={() => setDatePickerVisible(false)}
      />
    </>
  );
}
