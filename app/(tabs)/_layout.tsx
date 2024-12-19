import { TouchableOpacity } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { View } from '@/components/Themed';

export const TabBar = ({ descriptors, navigation }: BottomTabBarProps) => {
  const leftTabs = Object.entries(descriptors).slice(0, 2);
  const rightTabs = Object.entries(descriptors).slice(2);

  const renderTab = ([_, descriptor]: [string, any]) => {
    const { tabBarAccessibilityLabel, tabBarIcon } = descriptor.options;
    const { key: routeKey, name } = descriptor.route;
    const { isFocused } = descriptor.navigation;

    const onPress = () => {
      const event = navigation.emit({
        type: 'tabPress',
        target: routeKey,
        canPreventDefault: true,
      });

      if (!isFocused() && !event.defaultPrevented) {
        navigation.navigate(name);
      }
    };

    const onLongPress = () => {
      navigation.emit({
        type: 'tabLongPress',
        target: routeKey,
      });
    };

    return (
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityState={isFocused() ? { selected: true } : {}}
        accessibilityLabel={tabBarAccessibilityLabel}
        onPress={onPress}
        onLongPress={onLongPress}
        key={routeKey}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'transparent',
          padding: 8,
        }}
      >
        <View
          style={{
            width: 48,
            height: 48,
            borderRadius: 24,
            backgroundColor: isFocused() ? '#b6b7f179' : '#b0b2c376',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {tabBarIcon?.({
            focused: isFocused(),
            color: isFocused() ? '#464AB7' : '#fff',
            size: 24,
          })}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 8,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        backgroundColor: '#ffffff',
        position: 'absolute',
        zIndex: 0,
        bottom: 0,
        left: 0,
        width: '100%',
      }}
    >
      {/* Left Tabs */}
      <View style={{ flexDirection: 'row', backgroundColor: 'transparent' }}>
        {leftTabs.map(renderTab)}
      </View>
      {/* Right Tabs */}
      <View style={{ flexDirection: 'row', backgroundColor: 'transparent' }}>
        {rightTabs.map(renderTab)}
      </View>
    </View>
  );
};

export default function TabLayout() {
  const headerShown = useClientOnlyValue(false, true);

  return (
    <Tabs
      tabBar={TabBar}
      screenOptions={{
        tabBarActiveTintColor: '#fff',
        headerShown,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Ionicons name="warning" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="three"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="four"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Ionicons name="settings" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
