import Animated, { FadeIn, Easing, FadeOut } from 'react-native-reanimated';
import { StyleSheet, Pressable, Modal as RNModal } from 'react-native';
import React from 'react';

import { View } from './Themed';

import { useTheme } from '@/providers/ThemeProvider';

type ModalProps = {
  onClose: (close: boolean) => void;
  children: React.ReactNode;
};

export function Modal(props: ModalProps) {
  const theme = useTheme().theme;

  return (
    <RNModal visible transparent>
      <Animated.View
        entering={FadeIn.duration(300).easing(Easing.inOut(Easing.quad))}
        exiting={FadeOut.duration(300).easing(Easing.inOut(Easing.quad))}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: theme.colors.modalBackgroundOpacity,
          paddingHorizontal: 32,
          position: 'absolute',
          zIndex: 99999,
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <Pressable style={StyleSheet.absoluteFill} onPress={() => props.onClose(false)} />

        <View
          style={{
            width: '100%',
            maxHeight: '60%',
            backgroundColor: '#fff',
            padding: 32,
            borderRadius: 16,
            gap: 16,
            position: 'relative',
          }}
        >
          {props.children}
        </View>
      </Animated.View>
    </RNModal>
  );
}
