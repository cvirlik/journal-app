import PagerView from 'react-native-pager-view';
import { Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';

import { View } from './Themed';
import { Calendar } from './Calendar';

import { useTheme } from '@/providers/ThemeProvider';

const { width } = Dimensions.get('window');
const itemWidth = width / 3;

type DateItem = {
  day: string;
  date: string;
  year: string;
};

export function DateScroller() {
  const { theme } = useTheme();

  const dates: DateItem[] = [
    { day: 'Pondělí', date: '25. Listopadu', year: '2024' },
    { day: 'Úterý', date: '26. Listopadu', year: '2024' },
    { day: 'Středa', date: '27. Listopadu', year: '2024' },
    { day: 'Čtvrtek', date: '28. Listopadu', year: '2024' },
    { day: 'Pátek', date: '29. Listopadu', year: '2024' },
    { day: 'Neděle', date: '24. Listopadu', year: '2024' },
  ];

  const pagerViewRef = useRef<PagerView>(null);
  const [selectedIndex, setSelectedIndex] = useState(2);

  useEffect(() => {
    if (pagerViewRef.current) {
      pagerViewRef.current.setPage(selectedIndex);
    }
  }, [selectedIndex]);

  const handlePageSelected = (event: any) => {
    const index = event.nativeEvent.position;
    setSelectedIndex(index);
  };

  return (
    <View style={{ width: '100%', height: '100%' }}>
      <PagerView
        ref={pagerViewRef}
        style={styles.pagerView}
        initialPage={selectedIndex}
        onPageSelected={handlePageSelected}
      >
        {dates.map((item, index) => (
          <View
            key={index}
            style={{
              alignItems: 'center',
              width: '100%',
              height: '100%',
              gap: 8,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
                justifyContent: 'space-between',
                paddingHorizontal: 16,
              }}
            >
              <TouchableOpacity
                disabled={index === 0}
                onPressIn={() => setSelectedIndex(selectedIndex - 1)}
              >
                <Ionicons
                  name="chevron-back"
                  size={24}
                  color={index === 0 ? theme.colors.backgroundScroll : 'black'}
                />
              </TouchableOpacity>
              <View style={[styles.item, { width: itemWidth }]}>
                <Text style={styles.day}>{item.day}</Text>
                <Text style={styles.date}>{item.date}</Text>
                <Text style={styles.year}>{item.year}</Text>
              </View>
              <TouchableOpacity
                disabled={index === dates.length - 1}
                onPressIn={() => setSelectedIndex(selectedIndex + 1)}
              >
                <Ionicons
                  name="chevron-forward"
                  size={24}
                  color={index === dates.length - 1 ? theme.colors.backgroundScroll : 'black'}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.calendar}>
              <Calendar />
            </View>
          </View>
        ))}
      </PagerView>
    </View>
  );
}

const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 8,
    padding: 10,
    textAlign: 'center',
  },
  day: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 16,
  },
  year: {
    fontSize: 14,
    color: 'gray',
  },
  calendar: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flex: 1,
  },
});
