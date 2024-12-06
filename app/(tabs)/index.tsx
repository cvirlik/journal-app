import { StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import { RichView } from '@/components/RichView';
import { DateScroller } from '@/components/DateScroller';
import { Calendar } from '@/components/Calendar';

export default function TabOneScreen() {
  return (
    <RichView
      primaryChildren={
        <View style={{ backgroundColor: 'transparent' }}>
          <DateScroller />
        </View>
      }
      secondaryChildren={
        <View style={styles.container}>
          <View style={styles.timeline}>
            <Text style={styles.label}>Ráno</Text>
            <Text style={styles.label}>Dopoledne</Text>
            <Text style={styles.label}>Odpoledne</Text>
            <Text style={styles.label}>Večer</Text>
          </View>
          <View style={styles.calendar}>
            <Calendar />
          </View>
        </View>
      }
    ></RichView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 16,
    flexDirection: 'row',
  },
  timeline: {
    backgroundColor: 'transparent',
    flexDirection: 'column',
    justifyContent: 'space-around',
    flex: 1,
    alignItems: 'center',
  },
  calendar: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 8,
    padding: 16,
    paddingLeft: 0,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c2c32',
    textAlign: 'center',
    alignContent: 'center',
    width: 100,
    transform: [{ rotate: '-90deg' }],
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c2c32',
    textAlign: 'center',
    alignContent: 'center',
  },
});
