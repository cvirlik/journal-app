import { CheckBox } from 'react-native-elements';
import { ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '@/providers/ThemeProvider';
import { useMocapData } from '@/providers/MocapDataProviders';
import { TimePickerInput } from '@/components/TimePickerInput';
import { Text, View } from '@/components/Themed';
import TemplateList from '@/components/TemplateList';
import { Separator } from '@/components/Separator';
import { RichView } from '@/components/RichView';
import { RichButton } from '@/components/RichButton';
import { RepeatSelector } from '@/components/RepeatSelector';
import { DatePickerInput } from '@/components/DatePickerInput';

export default function NewActivityScreen() {
  const { theme } = useTheme();
  const { addItem } = useMocapData();
  const [modalVisible, setModalVisible] = useState(false);

  const [name, onChangeName] = React.useState('');
  const [description, onChangeDescription] = React.useState('');

  const [date, setDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);

  const [isTemplate, setTemplate] = useState(false);
  const [beforeNotification, setBeforeNotification] = useState(false);
  const [afterNotification, setAfterNotification] = useState(false);

  const [value, setValue] = useState<'day' | 'week' | 'month' | 'year' | null>(null);

  return (
    <>
      <RichView title="Nová aktivita" withScrollContainer={false} tab={false}>
        <ScrollView style={{ borderRadius: 16, backgroundColor: theme.colors.background }}>
          <View style={{ padding: 16, gap: 16 }}>
            <TouchableOpacity
              style={{
                width: '100%',
                flexDirection: 'row',
                direction: 'rtl',
              }}
              onPressIn={() => setModalVisible(true)}
            >
              <Text style={{ color: theme.colors.tintPrimary }}>Zvolit šablonu</Text>
            </TouchableOpacity>
            <View>
              <TextInput
                placeholderTextColor={'gray'}
                style={[styles.input, { borderColor: theme.colors.backgroundScroll }]}
                onChangeText={onChangeName}
                value={name}
                placeholder="Název aktivity"
              />
              {name.trim() === '' && (
                <Text style={{ color: theme.colors.tintError, fontSize: 12 }}>
                  Toto pole je povinné!
                </Text>
              )}
            </View>

            <TextInput
              placeholderTextColor={'gray'}
              style={[
                styles.input,
                {
                  borderColor: theme.colors.backgroundScroll,
                  minHeight: 100,
                  textAlignVertical: 'top',
                },
              ]}
              onChangeText={onChangeDescription}
              value={description}
              placeholder="Popis aktivity"
              multiline
            />
            <DatePickerInput value={date} setValue={setDate} />

            <TimePickerInput
              valueStart={startTime}
              valueEnd={endTime}
              setValueStart={setStartTime}
              setValueEnd={setEndTime}
            />
            <RepeatSelector value={value} setValue={setValue} />

            <CheckBox
              title="Uložit jako šablonu?"
              checked={isTemplate}
              onPressIn={() => setTemplate(!isTemplate)}
              checkedColor={theme.colors.backgroundScroll}
              uncheckedColor={theme.colors.backgroundScroll}
              textStyle={{ fontWeight: 'normal' }}
              containerStyle={{
                backgroundColor: theme.colors.defaultBackground,
                borderWidth: 0,
                padding: 0,
              }}
            />
            <Separator />
            <View>
              <Text style={{ fontSize: 18, marginBottom: 8 }}>Upozornění</Text>
              <CheckBox
                title="Před naplánovaným časem"
                checked={beforeNotification}
                onPressIn={() => setBeforeNotification(!beforeNotification)}
                checkedColor={theme.colors.tintOK}
                uncheckedColor={theme.colors.backgroundScroll}
                textStyle={{ fontWeight: 'normal', marginLeft: 0 }}
                wrapperStyle={{ justifyContent: 'space-between' }}
                containerStyle={{
                  backgroundColor: theme.colors.defaultBackground,
                  borderWidth: 0,
                  padding: 0,
                  marginLeft: 0,
                  width: '100%',
                  justifyContent: 'space-between',
                }}
                iconRight
              />
              <CheckBox
                title="Po skončení aktivity"
                checked={afterNotification}
                onPressIn={() => setAfterNotification(!afterNotification)}
                checkedColor={theme.colors.tintOK}
                uncheckedColor={theme.colors.backgroundScroll}
                textStyle={{
                  fontWeight: 'normal',
                  padding: 0,
                  marginLeft: 0,
                }}
                wrapperStyle={{ justifyContent: 'space-between' }}
                containerStyle={{
                  backgroundColor: theme.colors.defaultBackground,
                  borderWidth: 0,
                  padding: 0,
                  marginLeft: 0,
                  width: '100%',
                }}
                iconRight
              />
            </View>
            <Separator />
            <View>
              <RichButton
                title="Přidat aktivitu"
                icon={<Ionicons name="arrow-forward" size={24} color={theme.colors.tintDefault} />}
                onPress={() => {
                  router.push('/');

                  addItem('tasks', {
                    name,
                    description,
                    timeStart: startTime!,
                    timeEnd: endTime!,
                    date: date!,
                    completed: false,
                  });
                  if (isTemplate) {
                    addItem('templates', { name, description, repeat: value ?? undefined });
                  }
                }}
                color={
                  name.trim() === '' || startTime === null || endTime === null || date === null
                    ? theme.colors.backgroundScroll
                    : theme.colors.tintPrimary
                }
                colorText={theme.colors.tintDefault}
                filled
                link=""
                disabled={
                  name.trim() === '' || startTime === null || endTime === null || date === null
                }
                reverse
              />
            </View>
          </View>
        </ScrollView>
      </RichView>
      {modalVisible && (
        <TemplateList
          onClose={setModalVisible}
          onSelect={(
            name_: string,
            description_: string,
            repeat: 'day' | 'month' | 'year' | 'week' | undefined,
          ) => {
            onChangeName(name_);
            onChangeDescription(description_);
            setValue(repeat || null);
            setModalVisible(false);
          }}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  checkbox: {
    alignSelf: 'center',
  },
});
