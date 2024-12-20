import { router } from 'expo-router';

import { RichView } from '@/components/RichView';
import { FAB } from '@/components/FAB';
import { DateScroller } from '@/components/DateScroller';

export default function TabOneScreen() {
  const currentHour = new Date().getHours();

  let greeting: string;
  if (currentHour >= 6 && currentHour < 12) {
    greeting = 'Dobré ráno!'; // Good morning
  } else if (currentHour >= 12 && currentHour < 16) {
    greeting = 'Dobré odpoledne!'; // Good afternoon
  } else if (currentHour >= 16 && currentHour < 21) {
    greeting = 'Dobrý večer!'; // Good evening
  } else {
    greeting = 'Dobrou noc!'; // Good night
  }
  return (
    <>
      <RichView withScrollContainer={false} title={greeting}>
        <DateScroller />
      </RichView>
      <FAB onPress={() => router.push('/new-activity-screen')} />
    </>
  );
}
