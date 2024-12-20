import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { StyleSheet, TouchableOpacity } from 'react-native';
import type { LayoutChangeEvent } from 'react-native';
import React, { useState, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';

import { Text, View } from './Themed';
import { RichButton } from './RichButton';
import { Avatar } from './Avatar';

import { useTheme } from '@/providers/ThemeProvider';
import { useSelectedUser } from '@/providers/SelectedUserProvider';
import { useMocapData, type Actions } from '@/providers/MocapDataProviders';

function getTimeDifferenceInHours(targetDate: string) {
  const now = new Date(); // Current date and time
  const target = new Date(targetDate); // Convert target date to Date object

  const differenceInMilliseconds = now.getTime() - target.getTime();
  const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60);

  return differenceInHours.toFixed(0);
}

type PersonCardProps = Actions & {
  setModalOKVisible: (value: boolean) => void;
  setModalCallVisible: (value: boolean) => void;
};

export const PersonCard = React.memo(function PersonCard(props: PersonCardProps) {
  const theme = useTheme().theme;
  const { data } = useMocapData();

  const photoIndex = data.contacts.findIndex(contact => contact.name === props.whos);

  const set = useSelectedUser().set;

  const [isExpanded, setIsExpanded] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const [hasMeasured] = useState(false);

  const animatedHeight = useSharedValue(0);
  const animatedOpacity = useSharedValue(0);

  // Reference to prevent multiple measurements
  const measuredRef = useRef(false);

  // Handle the height and opacity animation
  const animatedStyle = useAnimatedStyle(() => ({
    height: animatedHeight.value,
    opacity: animatedOpacity.value,
  }));

  // Toggle expand/collapse with animation
  const toggleExpand = () => {
    if (isExpanded) {
      // Collapse
      animatedHeight.value = withTiming(0, {
        duration: 300,
        easing: Easing.out(Easing.ease),
      });
      animatedOpacity.value = withTiming(0, {
        duration: 300,
        easing: Easing.out(Easing.ease),
      });
    } else {
      // Expand
      animatedHeight.value = withTiming(contentHeight, {
        duration: 300,
        easing: Easing.out(Easing.ease),
      });
      animatedOpacity.value = withTiming(1, {
        duration: 300,
        easing: Easing.out(Easing.ease),
      });
    }
    setIsExpanded(!isExpanded);
  };

  // Capture the height of the additional content from the hidden measurement view
  const onMeasureLayout = (event: LayoutChangeEvent) => {
    if (measuredRef.current) return; // Prevent re-measuring
    const { height } = event.nativeEvent.layout;
    setContentHeight(height);
    measuredRef.current = true;

    // Initialize the animated values based on the initial state
    animatedHeight.value = withTiming(isExpanded ? height : 0, {
      duration: 300,
      easing: Easing.out(Easing.ease),
    });
    animatedOpacity.value = withTiming(isExpanded ? 1 : 0, {
      duration: 300,
      easing: Easing.out(Easing.ease),
    });
  };

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: theme.colors.background, borderColor: theme.colors.backgroundScroll },
      ]}
    >
      <View
        style={{
          backgroundColor: props.pending ? theme.colors.tintSecondary : theme.colors.tintOK,
          padding: 8,
          flexDirection: 'row',
          gap: 8,
        }}
      >
        <Ionicons
          name={props.pending ? 'warning' : 'happy-outline'}
          size={24}
          color={theme.colors.secondaryText}
        />
        <Text style={[styles.time, { color: theme.colors.secondaryText }]}>
          {props.pending
            ? `Naposledy reagoval/a před ${getTimeDifferenceInHours(props.time)} hod.`
            : 'Vyřešeno včera'}
        </Text>
      </View>
      <View style={{ padding: 16, alignItems: 'center', gap: 8 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', gap: 16 }}>
          <Avatar size={92} cxyr={46} image={data.photos[photoIndex].image} />
          <View style={{ flexDirection: 'column', width: '60%' }}>
            <Text style={styles.name}>{props.whos}</Text>
            <Text style={styles.log}>{props.pending ? props.lastAction : props.note}</Text>
            {!props.pending && (
              <Text style={[styles.log, { fontStyle: 'italic', fontSize: 14 }]}>
                {`vyřešil(a) ${props.whoSolve}`}
              </Text>
            )}
          </View>
        </View>
        {/* Toggleable Additional Info */}
        <Animated.View
          style={[animatedStyle, styles.animatedContainer, { overflow: 'hidden', width: '100%' }]}
        >
          <View style={styles.additionalContent}>
            <View
              style={{
                flexDirection: 'row',
                gap: 8,
                alignItems: 'center',
                width: '100%',
              }}
            >
              <Ionicons name="location" size={20} color={theme.colors.secondaryText} />
              <Text style={styles.label}>{props.location || 'N/A'}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                gap: 8,
                alignItems: 'center',
                width: '100%',
              }}
            >
              <Ionicons
                name={
                  props.battery >= 80
                    ? 'battery-full'
                    : props.battery >= 20
                      ? 'battery-half'
                      : 'battery-dead'
                }
                size={20}
                color={props.battery >= 20 ? theme.colors.secondaryText : theme.colors.tintError}
              />
              <Text
                style={[
                  styles.label,
                  {
                    color:
                      props.battery >= 20 ? theme.colors.secondaryText : theme.colors.tintError,
                  },
                ]}
              >
                {props.battery}%
              </Text>
            </View>
            {props.battery <= 20 && (
              <View style={{ paddingLeft: 32, alignItems: 'flex-start' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text>Uživatel se v posledním měsíci </Text>
                  <View
                    style={{
                      backgroundColor: theme.colors.tintError,
                      borderRadius: 8,
                      paddingHorizontal: 4,
                      paddingVertical: 2,
                      justifyContent: 'center',
                      width: 48,
                    }}
                  >
                    <Text style={{ fontWeight: 'bold', color: 'white' }}>2 krát</Text>
                  </View>
                </View>
                <Text>neozýval, kvůli vybitému mobilu.</Text>
              </View>
            )}
          </View>
        </Animated.View>
        {/* Toggle Button */}
        {props.pending && (
          <>
            <TouchableOpacity
              onPress={toggleExpand}
              style={{
                flexDirection: 'row',
                gap: 8,
                justifyContent: 'center',
                alignItems: 'center',
                alignContent: 'center',
              }}
            >
              <Text
                style={[
                  styles.toggleText,
                  {
                    color: theme.colors.secondaryText,
                    textAlignVertical: 'center',
                  },
                ]}
              >
                {isExpanded ? 'kliknutím zobrazíte méně' : 'kliknutím zobrazíte více'}
              </Text>
              <Ionicons
                name={isExpanded ? 'caret-up' : 'caret-down'}
                size={20}
                color={theme.colors.secondaryText}
                style={{ marginTop: 2 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flexDirection: 'row', gap: 8, alignItems: 'center', marginTop: 8 }}
            >
              <RichButton
                icon={<Ionicons name="call" size={20} color={theme.colors.tintPrimary} />}
                title="zavolat"
                colorText={theme.colors.tintPrimary}
                color={theme.colors.tintPrimary}
                filled={false}
                onPress={() => {
                  set({ name: props.whos });
                  props.setModalCallVisible(true);
                }}
              />
              <RichButton
                icon={<Ionicons name="checkmark" size={20} color={theme.colors.tintDefault} />}
                title="v pořádku"
                colorText={theme.colors.tintDefault}
                color={theme.colors.tintPrimary}
                filled
                onPress={() => {
                  set({ name: props.whos });
                  props.setModalOKVisible(true);
                }}
              />
            </TouchableOpacity>
          </>
        )}
      </View>
      {/* Hidden Measurement View */}
      {!hasMeasured && (
        <View style={styles.hiddenMeasure} onLayout={onMeasureLayout}>
          <View style={styles.additionalContent}>
            <Text style={styles.label}>{props.location || 'N/A'}</Text>
            <Text style={styles.label}>Battery: {props.battery}%</Text>
            {props.battery <= 20 && (
              <Text style={{ paddingLeft: 32 }}>
                Uživatel se v posledním měsíci 2 krát neozýval, kvůli vybitému mobilu.
              </Text>
            )}
          </View>
        </View>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  label: {
    fontSize: 16, // Adjusted for better UI
    fontWeight: 'bold',
    textAlign: 'left',
  },
  card: {
    borderWidth: 1,
    elevation: 5,
    margin: 8,
    borderRadius: 16,
    overflow: 'hidden',
  },
  time: {
    fontSize: 16,
    fontWeight: '400', // 'regular' is not a valid value
    textAlign: 'left', // Changed to 'left' for better alignment
  },
  name: {
    fontSize: 24, // Adjusted for better UI
    fontWeight: 'bold',
    textAlign: 'left',
  },
  log: {
    fontSize: 16, // Adjusted for better UI
    fontWeight: '400',
    textAlign: 'left',
  },
  toggleText: {
    fontSize: 16,
    fontWeight: '500',
  },
  animatedContainer: {
    // Additional styles if needed
  },
  additionalContent: {
    gap: 8,
    paddingVertical: 8,
    width: '100%',
  },
  hiddenMeasure: {
    position: 'absolute',
    top: -1000, // Position it off-screen
    left: 0,
    right: 0,
    opacity: 0, // Make it invisible
  },
});
