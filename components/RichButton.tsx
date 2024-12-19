import { StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import type { Href } from 'expo-router';

import { Text, View } from './Themed';

type RichButtonProps = {
  title: string;
  icon: React.ReactNode;
  color: string;
  colorText: string;
  filled: boolean;
  link?: string;
  reverse?: boolean;
  onPress?: (...args: any[]) => void;
  disabled?: boolean;
};

export function RichButton(props: RichButtonProps) {
  return (
    <TouchableOpacity
      disabled={props.disabled ?? false}
      style={[
        styles.button,
        {
          backgroundColor: props.filled ? props.color : 'transparent',
          borderColor: props.color,
          borderWidth: 1,
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
        },
      ]}
      onPress={() => {
        if (props.link) {
          router.push(props.link as Href);
        } else if (props.onPress) props.onPress();
      }}
    >
      <View
        style={{
          flexDirection: props.reverse ? 'row-reverse' : 'row',
          alignItems: 'center',
          gap: 8,
          justifyContent: 'center',
          width: '100%',
        }}
      >
        {props.icon}
        <Text
          style={{
            color: props.colorText,
            fontSize: 16,
            fontWeight: 'bold',
            textAlignVertical: 'center',
          }}
        >
          {props.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    width: 'auto',
    flex: 1,
    padding: 8,
  },
});
