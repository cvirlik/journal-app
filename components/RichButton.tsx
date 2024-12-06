import { StyleSheet } from 'react-native';
import { Link } from 'expo-router';

import { Text, View } from './Themed';

type RichButtonProps = {
  title: string;
  icon: React.ReactNode;
  color: string;
  colorText: string;
  filled: boolean;
  link: string;
  onPress?: () => void;
};

export function RichButton(props: RichButtonProps) {
  return (
    <Link
      href={`/${props.link}`}
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
        if (props.onPress) props.onPress();
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
          justifyContent: 'center',
          width: '100%',
        }}
      >
        {props.icon}
        <Text style={{ color: props.colorText, fontSize: 16, fontWeight: 'bold' }}>
          {props.title}
        </Text>
      </View>
    </Link>
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
