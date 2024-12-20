import { TextInput, StyleSheet } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

import { View } from './Themed';

import { useTheme } from '@/providers/ThemeProvider';

export function SearchBar({ onSearch }: { onSearch: (query: string) => void }) {
  const theme = useTheme().theme;

  return (
    <View style={[styles.searchContainer, { backgroundColor: theme.colors.background }]}>
      <Ionicons name="search" size={20} color="black" />
      <TextInput
        style={[styles.searchInput]}
        placeholder="Hledat"
        onChangeText={onSearch}
        placeholderTextColor="gray"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    borderRadius: 16,
    width: '85%',
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
});
