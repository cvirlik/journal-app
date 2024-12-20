import { Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Separator } from './Separator';
import { Modal } from './Modal';

import { useTheme } from '@/providers/ThemeProvider';
import { useMocapData } from '@/providers/MocapDataProviders';
import { View } from '@/components/Themed';

type TemplateListProps = {
  onSelect: (
    name: string,
    description: string,
    repeat: 'day' | 'month' | 'year' | 'week' | undefined,
  ) => void;
  onClose: (close: boolean) => void;
};

export default function TemplateList(props: TemplateListProps) {
  const templates = useMocapData().data.templates;

  const theme = useTheme().theme;

  const repeatTranslations: Record<string, string> = {
    day: 'denně',
    week: 'týdně',
    month: 'měsíčně',
    year: 'ročně',
    never: 'nikdy',
  };

  return (
    <Modal onClose={() => props.onClose(false)}>
      <TouchableOpacity
        style={{
          width: '10%',
          position: 'absolute',
          right: 16,
          top: 16,
        }}
        onPress={() => props.onClose(false)}
      >
        <Ionicons name="close" size={24} color={theme.colors.backgroundScroll} />
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >
        Šablony
      </Text>
      <ScrollView contentContainerStyle={{ gap: 8 }}>
        {templates.map((item, index) => (
          <View key={index} style={{ gap: 10 }}>
            <TouchableOpacity
              style={{
                width: '100%',
                borderRadius: 8,
              }}
              onPress={() => {
                props.onSelect(item.name, item.description, item.repeat);
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.name}</Text>
              <Text>{item.description}</Text>
              <Text>Opakování: {repeatTranslations[item.repeat ?? 'never']}</Text>
            </TouchableOpacity>
            {index !== templates.length - 1 && <Separator />}
          </View>
        ))}
      </ScrollView>
    </Modal>
  );
}
