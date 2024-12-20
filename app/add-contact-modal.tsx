import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '@/providers/ThemeProvider';
import { useMocapData } from '@/providers/MocapDataProviders';
import { View } from '@/components/Themed';
import { Separator } from '@/components/Separator';
import { Modal } from '@/components/Modal';
import { Avatar } from '@/components/Avatar';

type AddContactsModalProps = {
  onClose: (close: boolean) => void;
  onConfirm: (...args: any[]) => void;
};

export default function AddContactsModal(props: AddContactsModalProps) {
  const theme = useTheme().theme;
  const { data } = useMocapData();
  const contacts = data.avalibleContacts;
  return (
    <Modal onClose={props.onClose}>
      <TouchableOpacity
        style={{
          width: '10%',
          position: 'absolute',
          right: 16,
          top: 16,
        }}
        onPress={() => props.onClose(false)}
      >
        <Ionicons name="close" size={24} color={theme.colors.backgroundScroll} />
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >
        Dostupné kontakty
      </Text>
      <ScrollView contentContainerStyle={{ gap: 8 }}>
        {contacts.length === 0 && (
          <Text style={{ textAlign: 'center', fontSize: 16 }}>
            Momentálně nemáte žádné dostupné kontakty!
          </Text>
        )}
        {contacts.map((item, index) => (
          <View key={index} style={{ alignItems: 'center', gap: 4 }}>
            <TouchableOpacity style={styles.circleWrapper} onPress={() => props.onConfirm(item)}>
              <Avatar size={64} cxyr={32} image={data.photos[index + data.contacts.length].image} />
              <Text style={styles.circleLabel}>{item.name}</Text>
            </TouchableOpacity>
            {index < contacts.length - 1 && <Separator />}
          </View>
        ))}
      </ScrollView>
    </Modal>
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
  circleContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 4,
    padding: 16,
  },
  circleWrapper: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    margin: 4,
    gap: 16,
  },
  circleLabel: {
    fontSize: 18,
    fontWeight: '400',
    color: '#2c2c32ff',
    alignContent: 'center',
    textAlignVertical: 'center',
    lineHeight: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: '400',
    color: '#2c2c32ff',
    lineHeight: 20,
  },
  button: {
    width: 36, // size of the button
    height: 36, // size of the button
    borderRadius: 30, // makes it round
    justifyContent: 'center', // center icon horizontally
    alignItems: 'center', // center icon vertically
  },
});
