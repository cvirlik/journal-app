import Svg, { Circle } from 'react-native-svg';
import Animated, { Easing, FadeIn } from 'react-native-reanimated';
import { Pressable, StyleSheet, Text } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { useSelectedUser } from '@/providers/SelectedUserProvider';
import { View } from '@/components/Themed';
import { RichButton } from '@/components/RichButton';

export default function Modal() {
  const { profile, set } = useSelectedUser();
  const name = profile?.name;
  return (
    <Animated.View
      entering={FadeIn.duration(300).easing(Easing.inOut(Easing.quad))}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#A1A3F6',
        paddingHorizontal: 32,
      }}
    >
      {/* Dismiss modal when pressing outside */}

      <Link href={'/'} asChild>
        <Pressable style={StyleSheet.absoluteFill} />
      </Link>
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
          padding: 32,
          borderRadius: 16,
          gap: 16,
        }}
      >
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
            link="two"
            // onPress={() => {
            //   set(null);
            // }}
          />
          <RichButton
            icon={<Ionicons name="checkmark" size={20} color={'#fff'} />}
            title="ano"
            colorText="#fff"
            color="#464AB7"
            filled
            link="two"
          />
        </View>
      </View>
    </Animated.View>
  );
}
