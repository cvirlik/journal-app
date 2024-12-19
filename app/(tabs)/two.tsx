import { StyleSheet } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';

import OKModal from '../confirmation-modal';
import CallModal from '../call-modal';

import { useSelectedUser } from '@/providers/SelectedUserProvider';
import { useMocapData } from '@/providers/MocapDataProviders';
import { Text, View } from '@/components/Themed';
import { RichView } from '@/components/RichView';
import { PersonCard } from '@/components/PersonCard';

export default function TabTwoScreen() {
  const { data, editItem } = useMocapData();
  const { profile } = useSelectedUser();
  const sortedData = [...data.actions].sort((a, b) => (b.pending ? 1 : 0) - (a.pending ? 1 : 0));

  const [modalCallVisible, setModalCallVisible] = useState(false);
  const [modalOKVisible, setModalOKVisible] = useState(false);
  return (
    <>
      <RichView
        primaryChildren={
          <View style={{ backgroundColor: 'transparent' }}>
            <Text style={styles.label}>Události</Text>
          </View>
        }
        secondaryChildren={
          <View style={styles.container}>
            {sortedData.map((person, index) => (
              <PersonCard
                key={index}
                {...person}
                setModalOKVisible={setModalOKVisible}
                setModalCallVisible={setModalCallVisible}
              />
            ))}
          </View>
        }
      />
      {modalCallVisible && (
        <CallModal
          onConfirm={() => {
            setModalCallVisible(false);
            router.push('/call-screen');
          }}
          onClose={setModalCallVisible}
        />
      )}
      {modalOKVisible && (
        <OKModal
          onConfirm={() => {
            setModalOKVisible(false);

            const index = data.actions.findIndex(action => action.whos === profile?.name);
            if (index !== -1) {
              editItem('actions', index, {
                ...data.actions[index],
                pending: false,
                whoSolve: 'me',
              });
            }
          }}
          onClose={setModalOKVisible}
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
  container: {},
});
