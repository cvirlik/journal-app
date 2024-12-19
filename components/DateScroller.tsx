import Animated, { useAnimatedStyle, useSharedValue, interpolate } from 'react-native-reanimated';
import { FlatList, Text, StyleSheet, Dimensions } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';

const { width } = Dimensions.get('window');
const itemWidth = width / 3;
const spacing = 16;

// Define a type for the date item
type DateItem = {
  day: string;
  date: string;
  year: string;
};

// DateItemComponent renders a single date item
const DateItemComponent = ({
  item,
  index,
  scrollX,
  selectedIndex,
}: {
  item: DateItem;
  index: number;
  scrollX: any;
  selectedIndex: number;
}) => {
  const animatedStyle = useAnimatedStyle(() => {
    const inputRange = [
      (index - 1) * (itemWidth + spacing),
      index * (itemWidth + spacing),
      (index + 1) * (itemWidth + spacing),
    ];

    const scale = interpolate(scrollX.value, inputRange, [0.8, 1, 0.8], 'clamp');

    return {
      transform: [{ scale }],
      opacity: selectedIndex === index ? 1 : 0.7, // Highlight the selected item
    };
  });

  return (
    <Animated.View style={[styles.item, animatedStyle, { width: itemWidth }]}>
      <Text style={styles.day}>{item.day}</Text>
      <Text style={styles.date}>{item.date}</Text>
      <Text style={styles.year}>{item.year}</Text>
    </Animated.View>
  );
};

export function DateScroller() {
  const dates: DateItem[] = [
    { day: 'Pondělí', date: '25. Listopadu', year: '2024' },
    { day: 'Úterý', date: '26. Listopadu', year: '2024' },
    { day: 'Středa', date: '27. Listopadu', year: '2024' },
    { day: 'Čtvrtek', date: '28. Listopadu', year: '2024' },
    { day: 'Pátek', date: '29. Listopadu', year: '2024' },
    { day: 'Neděle', date: '24. Listopadu', year: '2024' },
  ];

  const scrollX = useSharedValue(0);
  const flatListRef = useRef<FlatList<DateItem>>(null); // Type definition for FlatList
  const [selectedIndex, setSelectedIndex] = useState(2); // Start with the 3rd item (index 2)

  // Initial scroll to center the 3rd item (index 2)
  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({
        offset: selectedIndex * (itemWidth + spacing),
        animated: false, // Disable animation for initial scroll
      });
    }
  }, [selectedIndex]);

  const handleScrollEndDrag = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.floor(contentOffsetX / (itemWidth + spacing));
    setSelectedIndex(index); // Update the selected index after scrolling ends
  };

  return (
    <FlatList
      ref={flatListRef}
      data={dates}
      renderItem={({ item, index }) => (
        <DateItemComponent
          item={item}
          index={index}
          scrollX={scrollX}
          selectedIndex={selectedIndex}
        />
      )}
      keyExtractor={(_, index) => index.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      snapToInterval={itemWidth + spacing} // Snapping interval
      snapToAlignment="center"
      decelerationRate="fast"
      contentContainerStyle={{
        paddingHorizontal: (width - itemWidth) / 2, // Centering the items within the FlatList container
      }}
      getItemLayout={(data, index) => ({
        length: itemWidth + spacing,
        offset: (itemWidth + spacing) * index,
        index,
      })}
      onScroll={event => {
        scrollX.value = event.nativeEvent.contentOffset.x; // Track scroll position
      }}
      scrollEventThrottle={16}
      onScrollEndDrag={handleScrollEndDrag} // Update selected index after scrolling ends
    />
  );
}

const styles = StyleSheet.create({
  item: {
    marginHorizontal: spacing / 2, // Apply margin to each item for proper spacing
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    padding: 10,
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
});
