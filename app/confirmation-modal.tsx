import Svg, { Circle } from 'react-native-svg';
import { Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useSelectedUser } from '@/providers/SelectedUserProvider';
import { View } from '@/components/Themed';
import { RichButton } from '@/components/RichButton';
import { Modal } from '@/components/Modal';

type OKModalProps = {
  onClose: (close: boolean) => void;
  onConfirm: (...args: any[]) => void;
};

export default function OKModal(props: OKModalProps) {
  const { profile } = useSelectedUser();
  const name = profile?.name;
  return (
    <Modal onClose={props.onClose}>
      <View style={{ flexDirection: 'column', gap: 8, alignItems: 'center' }}>
        <Svg height="100" width="100">
          <Circle cx="48" cy="48" r="48" fill="pink" />
        </Svg>
        <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 32 }}>{name}</Text>
        <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16, textAlign: 'center' }}>
          {`je ${name} v bezpečí?`}
        </Text>
      </View>
      <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
        <RichButton
          icon={<Ionicons name="close-sharp" size={20} color={'#464AB7'} />}
          title="zrušit"
          colorText="#464AB7"
          color="#464AB7"
          filled={false}
          onPress={props.onClose}
        />
        <RichButton
          icon={<Ionicons name="checkmark" size={20} color={'#fff'} />}
          title="ano"
          colorText="#fff"
          color="#464AB7"
          filled
          onPress={props.onConfirm}
        />
      </View>
    </Modal>
  );
}
