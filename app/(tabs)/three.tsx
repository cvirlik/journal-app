import Svg, { Circle } from 'react-native-svg';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

import AddContactsModal from '../add-contact-modal';

import { useTheme } from '@/providers/ThemeProvider';
import { useMocapData, User } from '@/providers/MocapDataProviders';
import { Text, View } from '@/components/Themed';
import { Separator } from '@/components/Separator';
import { RichView } from '@/components/RichView';

export default function TabTwoScreen() {
  const theme = useTheme().theme;
  const { data, addItem, deleteItem } = useMocapData();

  const [modalContactsVisible, setModalContactsVisible] = useState(false);
  return (
    <>
      <RichView
        primaryChildren={
          <View style={{ backgroundColor: 'transparent' }}>
            <Text style={styles.label}>Kontakty</Text>
          </View>
        }
        secondaryChildren={
          <View style={styles.circleContainer}>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 8,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  gap: 8,
                  backgroundColor: theme.colors.background,
                  padding: 8,
                  borderRadius: 16,
                  width: '85%',
                }}
              >
                <Ionicons name="search" size={20} color="black" />
                <Text style={styles.text}>Search</Text>
              </View>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: theme.colors.tintOK }]}
                onPress={() => setModalContactsVisible(true)}
              >
                <Ionicons name="add" size={20} color="black" />
              </TouchableOpacity>
            </View>
            {data.contacts.map((item, index) => (
              <View key={index} style={{ alignItems: 'center', gap: 4 }}>
                <View style={styles.circleWrapper}>
                  <Svg height="64" width="64">
                    <Circle cx="32" cy="32" r="32" fill={item.avatarColor} />
                  </Svg>
                  <Text style={styles.circleLabel}>{item.name}</Text>
                </View>
                {index < data.contacts.length - 1 && <Separator />}
              </View>
            ))}
          </View>
        }
      />
      {modalContactsVisible && (
        <AddContactsModal
          onConfirm={(user: User) => {
            setModalContactsVisible(false);

            addItem('contacts', user);
            const index = data.avalibleContacts.findIndex(contact => contact.name === user.name);
            if (index !== -1) {
              deleteItem('avalibleContacts', index);
            }
          }}
          onClose={setModalContactsVisible}
        />
      )}
    </>
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
