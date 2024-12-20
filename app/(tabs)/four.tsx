import { ScrollView, Text, TouchableOpacity } from 'react-native';
import React from 'react';

import { useTheme } from '@/providers/ThemeProvider';
import { View } from '@/components/Themed';
import { RichView } from '@/components/RichView';

export default function TabTwoScreen() {
  const { theme } = useTheme();

  return (
    <RichView title="Nastavení" withScrollContainer={false}>
      <ScrollView style={{ borderRadius: 16, backgroundColor: theme.colors.background }}>
        <View style={{ padding: 16, gap: 16 }}>
          {/* Example Setting: Account Management */}
          <TouchableOpacity style={{ borderRadius: 8 }}>
            <Text style={{ color: theme.colors.tintPrimary, fontSize: 16 }}>Účet</Text>
          </TouchableOpacity>

          {/* Example Setting: Notifications */}
          <TouchableOpacity style={{ borderRadius: 8 }}>
            <Text style={{ color: theme.colors.tintPrimary, fontSize: 16 }}>Oznámení</Text>
          </TouchableOpacity>

          {/* Example Setting: Language */}
          <TouchableOpacity style={{ borderRadius: 8 }}>
            <Text style={{ color: theme.colors.tintPrimary, fontSize: 16 }}>Změnit jazyk</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </RichView>
  );
}
