import { Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import React from 'react';

import { View } from './Themed';

export function DateScroller() {
  const dates = [
    { day: '', date: '', year: '' },
    { day: 'Pondělí', date: '25. Listopadu', year: '2024' },
    { day: 'Úterý', date: '26. Listopadu', year: '2024' },
    { day: 'Středa', date: '27. Listopadu', year: '2024' },
    { day: 'Čtvrtek', date: '28. Listopadu', year: '2024' },
    { day: 'Pátek', date: '29. Listopadu', year: '2024' },
    { day: 'Neděle', date: '24. Listopadu', year: '2024' },
    { day: '', date: '', year: '' },
  ];

  const { width } = Dimensions.get('window');
  const itemWidth = width / 3; // Each item takes up 1/3 of the screen width

  const renderItem = ({ item }) => (
    <View style={[styles.item, { width: itemWidth }]}>
      <Text style={styles.day}>{item.day}</Text>
      <Text style={styles.date}>{item.date}</Text>
      <Text style={styles.year}>{item.year}</Text>
    </View>
  );

  return (
    <FlatList
      data={dates}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      horizontal
      contentContainerStyle={[styles.list]}
      showsHorizontalScrollIndicator={false}
      pagingEnabled
      snapToInterval={itemWidth + 16} // Ensures snapping happens at each item's width
      snapToAlignment="center" // Align snapping to the start of each item
      decelerationRate="fast" // Faster deceleration for snapping
    />
  );
}

const styles = StyleSheet.create({
  dateContainer: {
    alignItems: 'center',
    marginRight: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  list: {
    // paddingHorizontal: 16,
  },
  item: {
    marginHorizontal: 8,
    alignItems: 'center',
  },
  day: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 16,
  },
  year: {
    fontSize: 14,
    color: '#888',
  },
});
