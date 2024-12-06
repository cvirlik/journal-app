import Svg, { Circle } from 'react-native-svg';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Text, View } from './Themed';
import { RichButton } from './RichButton';

import { useSelectedUser } from '@/providers/SelectedUserProvider';

export type PersonProps = {
  name: string;
  lastActivityTime: string;
  lastActivityLog: string;
  location: string | undefined;
  battery: number;
  active: boolean;
};

function getTimeDifferenceInHours(targetDate: string) {
  const now = new Date(); // Get the current date and time
  const target = new Date(targetDate); // Convert the target date to a Date object

  const nowTime = now.getTime();
  const targetTime = target.getTime();

  const differenceInMilliseconds = nowTime - targetTime;
  const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60);

  return differenceInHours.toFixed(0);
}

export function PersonCard(props: PersonProps) {
  const set = useSelectedUser().set;
  return (
    <View style={styles.card}>
      <View style={{ backgroundColor: '#EEFF00', padding: 8, flexDirection: 'row', gap: 8 }}>
        <Ionicons name="warning" size={24} color={'#575757'} />
        <Text
          style={styles.time}
        >{`Naposledy reagoval/a před ${getTimeDifferenceInHours(props.lastActivityTime)} hodinami `}</Text>
      </View>
      <View style={{ padding: 16 }}>
        <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
          <Svg height="100" width="100">
            <Circle cx="48" cy="48" r="48" fill="pink" />
          </Svg>
          <View style={{ flexDirection: 'column', gap: 0 }}>
            <Text style={styles.name}>{props.name}</Text>
            <Text style={styles.log}>{props.lastActivityLog}</Text>
          </View>
        </View>
        {/* <Text style={styles.label}>{props.location || 'N/A'}</Text>
        <Text style={styles.label}>{props.battery}</Text>
        <Text style={styles.label}>{props.active ? 'Active' : 'Inactive'}</Text> */}
        <TouchableOpacity style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
          <RichButton
            icon={<Ionicons name="call" size={20} color={'#464AB7'} />}
            title="zavolat"
            colorText="#464AB7"
            color="#464AB7"
            filled={false}
            link="call-modal"
            onPress={() => {
              set({ name: props.name });
            }}
          />
          <RichButton
            icon={<Ionicons name="checkmark" size={20} color={'#fff'} />}
            title="v pořádku"
            colorText="#fff"
            color="#464AB7"
            filled
            link="confirmation-modal"
            onPress={() => {
              console.log('Button pressed:', props.name);
              set({ name: props.name });
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
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
  card: {
    borderWidth: 1,
    borderColor: '#cccccc',
    elevation: 5,
    margin: 8,
    backgroundColor: 'white',
    borderRadius: 16,
    overflow: 'hidden',
  },
  time: {
    fontSize: 16,
    fontWeight: 'regular',
    color: '#2c2c32ff',
    alignContent: 'center',
  },
  name: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2c2c32ff',
    alignContent: 'center',
  },
  log: {
    fontSize: 20,
    fontWeight: 'regular',
    color: '#2c2c32ff',
    alignContent: 'center',
  },
});
