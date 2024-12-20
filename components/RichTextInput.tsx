import { TextInput, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import type { TextInputProps } from 'react-native';
import React from 'react';

import { Text, View } from './Themed';

import { useTheme } from '@/providers/ThemeProvider';

type RichTextInputProps = TextInputProps & {
  textInputProps: TextInputProps;
  onIconPress?: () => void;
  icon?: React.ReactNode;
  value: string;
  setValue: (value: any) => void;
  onPress?: (event: Event) => void;
  required?: boolean;
};

export function RichTextInput({
  textInputProps,
  onIconPress,
  icon,
  value,
  setValue,
  onPress = () => {},
  required = false,
}: RichTextInputProps) {
  const theme = useTheme().theme;

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <>
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
        {required && value.trim() === '' && (
          <Text style={{ color: theme.colors.tintError, fontSize: 12 }}>Toto pole je povinné!</Text>
        )}
      </>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  input: {
    flex: 1,
  },
});
