import Svg, { Circle } from 'react-native-svg';
import { StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

import AddContactsModal from '../add-contact-modal';

import { useTheme } from '@/providers/ThemeProvider';
import { useMocapData } from '@/providers/MocapDataProviders';
import type { User } from '@/providers/MocapDataProviders';
import { Text, View } from '@/components/Themed';
import { Separator } from '@/components/Separator';
import { SearchBar } from '@/components/SearchBar';
import { RichView } from '@/components/RichView';

export default function TabThreeScreen() {
  const theme = useTheme().theme;
  const { data, addItem, deleteItem } = useMocapData();

  const [modalContactsVisible, setModalContactsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredContacts = data.contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

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
              <SearchBar onSearch={setSearchQuery} />
              <TouchableOpacity
                style={[styles.button, { backgroundColor: theme.colors.tintOK }]}
                onPressIn={() => setModalContactsVisible(true)}
              >
                <Ionicons name="add" size={20} color="black" />
              </TouchableOpacity>
            </View>

            {filteredContacts.length === 0 ? (
              <Text
                style={[styles.noContactsText, { color: theme.colors.secondaryText }]}
              >{`Žádný takový kontakt neexistuje :(`}</Text>
            ) : (
              filteredContacts.map((item, index) => (
                <View key={index} style={{ alignItems: 'center', gap: 6 }}>
                  <View style={styles.circleWrapper}>
                    <Svg height="64" width="64">
                      <Circle cx="32" cy="32" r="32" fill={item.avatarColor} />
                    </Svg>
                    <Text style={styles.circleLabel}>{item.name}</Text>
                  </View>
                  {index < filteredContacts.length - 1 && <Separator />}
                </View>
              ))
            )}
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
  },
  circleContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 16,
    gap: 6,
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
    lineHeight: 20,
  },
  noContactsText: {
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
    marginTop: 16,
  },
  button: {
    width: 36,
    height: 36,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
