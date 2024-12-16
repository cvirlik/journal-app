import Svg, { Circle } from 'react-native-svg';
import Animated, { Easing, FadeIn } from 'react-native-reanimated';
import { Pressable, StyleSheet, Text } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '@/providers/ThemeProvider';
import { useSelectedUser } from '@/providers/SelectedUserProvider';
import { View } from '@/components/Themed';
import { RichButton } from '@/components/RichButton';

export default function CallModal() {
  const theme = useTheme().theme;
  const { profile } = useSelectedUser();
  const name = profile?.name;
  return (
    <Animated.View
      entering={FadeIn.duration(300).easing(Easing.inOut(Easing.quad))}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.modalBackground,
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
            link="two"
          />
          <RichButton
            icon={<Ionicons name="call" size={20} color={'#fff'} />}
            title="zavolat"
            colorText="#fff"
            color={theme.colors.tintPrimary}
            filled
            link="call-screen"
          />
        </View>
      </View>
    </Animated.View>
  );
}
