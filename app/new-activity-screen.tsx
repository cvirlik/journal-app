import DateTimePicker from 'react-native-modal-datetime-picker';
import { CheckBox } from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';
import { Keyboard, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '@/providers/ThemeProvider';
import { useMocapData } from '@/providers/MocapDataProviders';
import { Text, View } from '@/components/Themed';
import TemplateList from '@/components/TemplateList';
import { RichTextInput } from '@/components/RichTextInput';
import { RichButton } from '@/components/RichButton';
import { Logo } from '@/components/Logo';

export default function NewActivityScreen() {
  const theme = useTheme().theme;
  const { addItem } = useMocapData();
  const [modalVisible, setModalVisible] = useState(false);
  const [open, setOpen] = useState(false);

  const [name, onChangeName] = React.useState('');
  const [description, onChangeDescription] = React.useState('');

  const [date, setDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);

  const [isTemplate, setTemplate] = useState(false);
  const [beforeNotification, setBeforeNotification] = useState(false);
  const [afterNotification, setAfterNotification] = useState(false);

  const [value, setValue] = useState<'day' | 'week' | 'month' | 'year' | null>(null);
  const [items, setItems] = useState([
    { label: 'Denně', value: 'day' },
    { label: 'Týdně', value: 'week' },
    { label: 'Měsíčně', value: 'month' },
    { label: 'Ročně', value: 'year' },
  ]);

  // Date and Time Picker States
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isStartTimePickerVisible, setStartTimePickerVisible] = useState(false);
  const [isEndTimePickerVisible, setEndTimePickerVisible] = useState(false);

  const handleDateConfirm = (d: Date) => {
    setDate(d);
    setDatePickerVisible(false);
  };

  const handleStartTimeConfirm = (time: Date) => {
    setStartTime(time);
    setStartTimePickerVisible(false);
  };

  const handleEndTimeConfirm = (time: Date) => {
    setEndTime(time);
    setEndTimePickerVisible(false);
  };

  return (
    <>
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={[styles.wrapper, { backgroundColor: theme.colors.defaultBackground }]}>
          <Logo />
          <View style={{ backgroundColor: 'transparent' }}>
            <Text style={styles.label}>Nová aktivita</Text>
          </View>
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
              <View>
                <RichTextInput
                  textInputProps={{
                    placeholder: 'Datum',
                    value: date ? date.toLocaleDateString() : '',
                  }}
                  value={date?.toLocaleDateString() || ''}
                  setValue={setDate}
                  onPress={event => {
                    event.preventDefault();
                    Keyboard.dismiss();
                    setDatePickerVisible(true);
                  }}
                  onIconPress={() => setDatePickerVisible(true)}
                  icon={
                    <Ionicons name="calendar" size={20} color={theme.colors.backgroundScroll} />
                  }
                />
                {name.trim() === '' && (
                  <Text style={{ color: theme.colors.tintError, fontSize: 12 }}>
                    Toto pole je povinné!
                  </Text>
                )}
              </View>
              <DateTimePicker
                isVisible={isDatePickerVisible}
                mode="date"
                locale="cs_CZ"
                onConfirm={handleDateConfirm}
                onCancel={() => setDatePickerVisible(false)}
              />
              <View style={{ flexDirection: 'row', width: '100%', gap: 8 }}>
                <View style={{ flex: 1 }}>
                  <RichTextInput
                    textInputProps={{
                      placeholder: 'Čas začátku',
                      value: startTime
                        ? startTime.toLocaleTimeString('cs-CZ', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })
                        : '',
                    }}
                    value={
                      startTime
                        ? startTime.toLocaleTimeString('cs-CZ', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })
                        : ''
                    }
                    setValue={setStartTime}
                    onPress={event => {
                      event.preventDefault();
                      Keyboard.dismiss();
                      setStartTimePickerVisible(true);
                    }}
                    onIconPress={() => setStartTimePickerVisible(true)}
                    icon={
                      <Ionicons
                        name="time-outline"
                        size={22}
                        color={theme.colors.backgroundScroll}
                      />
                    }
                  />
                  {name.trim() === '' && (
                    <Text style={{ color: theme.colors.tintError, fontSize: 12 }}>
                      Toto pole je povinné!
                    </Text>
                  )}
                </View>
                {isStartTimePickerVisible && (
                  <DateTimePicker
                    isVisible={isStartTimePickerVisible}
                    mode="time"
                    onConfirm={handleStartTimeConfirm}
                    onCancel={() => setStartTimePickerVisible(false)}
                  />
                )}
                <View style={{ flex: 1 }}>
                  <RichTextInput
                    textInputProps={{
                      placeholder: 'Čas konce',
                      value: endTime
                        ? endTime.toLocaleTimeString('cs-CZ', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })
                        : '',
                    }}
                    value={
                      endTime
                        ? endTime.toLocaleTimeString('cs-CZ', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })
                        : ''
                    }
                    setValue={setEndTime}
                    onPress={event => {
                      event.preventDefault();
                      Keyboard.dismiss();
                      setEndTimePickerVisible(true);
                    }}
                    onIconPress={() => setEndTimePickerVisible(true)}
                    icon={
                      <Ionicons
                        name="time-outline"
                        size={22}
                        color={theme.colors.backgroundScroll}
                      />
                    }
                  />
                  {name.trim() === '' && (
                    <Text style={{ color: theme.colors.tintError, fontSize: 12 }}>
                      Toto pole je povinné!
                    </Text>
                  )}
                </View>
                <DateTimePicker
                  isVisible={isEndTimePickerVisible}
                  mode="time"
                  onConfirm={handleEndTimeConfirm}
                  onCancel={() => setEndTimePickerVisible(false)}
                />
              </View>
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
                    <Ionicons
                      name="checkmark-outline"
                      size={22}
                      color={theme.colors.backgroundScroll}
                    />
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
              <View style={{ alignItems: 'center', width: '100%' }}>
                <View
                  style={[styles.separator, { backgroundColor: theme.colors.backgroundScroll }]}
                />
              </View>
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
              <View style={{ alignItems: 'center', width: '100%' }}>
                <View
                  style={[styles.separator, { backgroundColor: theme.colors.backgroundScroll }]}
                />
              </View>
              <View>
                <RichButton
                  title="Přidat aktivitu"
                  icon={
                    <Ionicons name="arrow-forward" size={24} color={theme.colors.tintDefault} />
                  }
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
        </View>
      </View>
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
  label: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2c2c32ff',
    textAlign: 'center',
    alignContent: 'center',
  },
  container: {
    paddingTop: 16,
    flex: 1,
  },
  wrapper: {
    gap: 28,
    flexDirection: 'column',
    flex: 1,
  },
  input: {
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  checkbox: {
    alignSelf: 'center',
  },
  separator: {
    height: 1,
    width: '100%',
  },
});
