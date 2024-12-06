import { Path, Svg } from 'react-native-svg';
import { StyleSheet } from 'react-native';

import { View } from './Themed';

export function Logo() {
  return (
    <View style={styles.logo}>
      <Svg width="24" height="24" viewBox="0 0 23 23" fill="none">
        <Path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M11.5 6.5462C7.49381 6.5462 4.24615 9.79386 4.24615 13.8H0C0 7.44877 5.14873 2.30005 11.5 2.30005C17.8513 2.30005 23 7.44877 23 13.8H18.7538C18.7538 9.79386 15.5062 6.5462 11.5 6.5462Z"
          fill="#585CE5"
        />
        <Path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M11.5 6.5462C7.49381 6.5462 4.24615 9.79386 4.24615 13.8H0C0 7.44877 5.14873 2.30005 11.5 2.30005C17.8513 2.30005 23 7.44877 23 13.8H18.7538C18.7538 9.79386 15.5062 6.5462 11.5 6.5462Z"
          fill="#585CE5"
          fill-opacity="0.2"
        />
        <Path
          d="M11.5 20.7C15.5062 20.7 18.7538 17.5315 18.7538 13.623H4.24615C4.24615 17.5315 7.49381 20.7 11.5 20.7Z"
          fill="#58C6CD"
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    backgroundColor: 'transparent',
    width: '100%',
    height: 24,
    paddingHorizontal: 32,
  },
});
