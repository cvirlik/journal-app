import Svg, { Circle } from 'react-native-svg';
import { Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '@/providers/ThemeProvider';
import { useSelectedUser } from '@/providers/SelectedUserProvider';
import { View } from '@/components/Themed';
import { RichButton } from '@/components/RichButton';
import { Modal } from '@/components/Modal';

type CallModalProps = {
  onClose: (close: boolean) => void;
  onConfirm: (...args: any[]) => void;
};

export default function CallModal(props: CallModalProps) {
  const theme = useTheme().theme;
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
          {`opravdu chcete zavolat kontaktu ${name}?`}
        </Text>
        <Text
          style={{
            fontWeight: 'regular',
            color: '#575757',
            fontSize: 14,
            textAlign: 'center',
            fontStyle: 'italic',
          }}
        >
          {`Tip: Začněte váš hovor například “Ahoj ${name}, jak se máš? Všiml jsem si že jsi zapomněla odškrtnout tvoji aktivitu.”`}
        </Text>
      </View>
      <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
        <RichButton
          icon={<Ionicons name="close-sharp" size={20} color={theme.colors.tintPrimary} />}
          title="zrušit"
          colorText={theme.colors.tintPrimary}
          color={theme.colors.tintPrimary}
          filled={false}
          onPress={props.onClose}
        />
        <RichButton
          icon={<Ionicons name="call" size={20} color={'#fff'} />}
          title="zavolat"
          colorText="#fff"
          color={theme.colors.tintPrimary}
          filled
          onPress={props.onConfirm}
        />
      </View>
    </Modal>
  );
}
