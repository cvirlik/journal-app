import DropDownPicker from 'react-native-dropdown-picker';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

import { Text, View } from './Themed';

import { useTheme } from '@/providers/ThemeProvider';

type RepeatSelectorProps = {
  value: 'day' | 'week' | 'month' | 'year' | null;
  setValue: (value: any) => void;
};

export function RepeatSelector({ value, setValue }: RepeatSelectorProps) {
  const { theme } = useTheme();

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: 'Denně', value: 'day' },
    { label: 'Týdně', value: 'week' },
    { label: 'Měsíčně', value: 'month' },
    { label: 'Ročně', value: 'year' },
  ]);
  return (
    <View style={{ gap: 4 }}>
      <Text style={{ color: 'gray', marginLeft: 2 }}>Opakování</Text>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        style={{
          borderColor: theme.colors.backgroundScroll,
        }}
        TickIconComponent={() => (
          <Ionicons name="checkmark-outline" size={22} color={theme.colors.backgroundScroll} />
        )}
        showTickIcon
        ArrowDownIconComponent={() => (
          <Ionicons name="chevron-down" size={22} color={theme.colors.backgroundScroll} />
        )}
        ArrowUpIconComponent={() => (
          <Ionicons name="chevron-up" size={22} color={theme.colors.backgroundScroll} />
        )}
        dropDownContainerStyle={{
          borderColor: theme.colors.backgroundScroll,
        }}
        placeholderStyle={{ color: theme.colors.placeholderText }}
      />
    </View>
  );
}
