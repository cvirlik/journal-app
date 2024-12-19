import { TextInput, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import type { TextInputProps } from 'react-native';
import React from 'react';

import { View } from './Themed';

import { useTheme } from '@/providers/ThemeProvider';

type RichTextInputProps = TextInputProps & {
  textInputProps: TextInputProps;
  onIconPress: () => void;
  icon: React.ReactNode;
  value: string;
  setValue: (value: Date) => void;
  onPress?: (event: Event) => void;
};

export function RichTextInput({
  textInputProps,
  onIconPress,
  icon,
  value,
  setValue,
  onPress = () => {},
}: RichTextInputProps) {
  const theme = useTheme().theme;

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.inputContainer, { borderColor: theme.colors.backgroundScroll }]}>
        <TextInput
          {...textInputProps}
          style={styles.input}
          value={value}
          editable={onPress === (() => {}) ? true : false}
          placeholderTextColor={'gray'}
          onChangeText={() => {
            setValue(new Date(value));
          }}
        />
        <TouchableOpacity onPress={onIconPress}>{icon}</TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 8,
    flex: 1,
  },
  input: {
    flex: 1,
  },
});
