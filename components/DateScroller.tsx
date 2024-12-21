import PagerView from 'react-native-pager-view';
import { Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';

import { View } from './Themed';
import { Calendar } from './Calendar';

import { useTheme } from '@/providers/ThemeProvider';
import { useMocapData } from '@/providers/MocapDataProviders';

const { width } = Dimensions.get('window');
const itemWidth = width / 3;

type DateItem = {
  day: string;
  date: string;
  year: string;
  dateFull: Date;
};

const getDaysBetweenDates = (startDate: Date, endDate: Date): Date[] => {
  const days: Date[] = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    days.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
  }

  return days;
};

export function DateScroller() {
  const { theme } = useTheme();
  const { data } = useMocapData();

  const getSortedTasks = () => {
    const sortedTasks = [...data.tasks];
    sortedTasks.sort((a, b) => a.date.getTime() - b.date.getTime());
    return sortedTasks;
  };

  const getDateRange = (): Date[] => {
    const tasks = getSortedTasks();
    if (tasks.length === 0) return [];

    const firstTaskDate = tasks[0].date;
    const latestTaskDate = new Date(
      Math.max(new Date().getTime(), new Date(tasks[tasks.length - 1].date).getTime()),
    );

    return getDaysBetweenDates(firstTaskDate, latestTaskDate);
  };

  const dates: DateItem[] = getDateRange().map(date => ({
    day:
      date.toLocaleDateString('cs-CZ', { weekday: 'long' }).charAt(0).toUpperCase() +
      date.toLocaleDateString('cs-CZ', { weekday: 'long' }).slice(1),
    date: date.toLocaleDateString('cs-CZ', { day: 'numeric', month: 'long' }),
    year: date.getFullYear().toString(),
    dateFull: date,
  }));

  const pagerViewRef = useRef<PagerView>(null);
  const todayIndex = dates.findIndex(
    item => item.dateFull.toDateString() === new Date().toDateString(),
  );
  const [selectedIndex, setSelectedIndex] = useState(todayIndex);

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
              <Calendar date={item.dateFull} />
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
