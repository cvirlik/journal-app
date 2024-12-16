import { StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import { RichView } from '@/components/RichView';
import { PersonCard, type PersonProps } from '@/components/PersonCard';

export default function TabTwoScreen() {
  const mockData: PersonProps[] = [
    {
      name: 'John Doe',
      lastActivityTime: '2024-12-05T08:00:00',
      lastActivityLog: 'Living life',
      location: 'New York',
      battery: 12,
      active: true,
    },
    {
      name: 'Jane Smith',
      lastActivityTime: '2024-12-04T18:00:00',
      lastActivityLog: 'Cleaning',
      location: undefined,
      battery: 62,
      active: false,
    },
    {
      name: 'Mark Johnson',
      lastActivityTime: '2024-12-05T09:00:00',
      lastActivityLog: 'Sleeping',
      location: 'California',
      battery: 95,
      active: true,
    },
    {
      name: 'Alice Brown',
      lastActivityTime: '2024-12-03T20:00:00',
      lastActivityLog: 'Oaoaoao',
      location: 'London',
      battery: 45,
      active: false,
    },
  ];
  const sortedData = [...mockData].sort((a, b) => (b.active ? 1 : 0) - (a.active ? 1 : 0));
  return (
    <RichView
      primaryChildren={
        <View style={{ backgroundColor: 'transparent' }}>
          <Text style={styles.label}>Události</Text>
        </View>
      }
      secondaryChildren={
        <View style={styles.container}>
          {sortedData.map((person, index) => (
            <PersonCard key={index} {...person} />
          ))}
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2c2c32ff',
    textAlign: 'center',
    alignContent: 'center',
  },
  container: {},
});
