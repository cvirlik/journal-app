import { router } from 'expo-router';

import { RichView } from '@/components/RichView';
import { FAB } from '@/components/FAB';
import { DateScroller } from '@/components/DateScroller';

export default function TabOneScreen() {
  return (
    <>
      <RichView withScrollContainer={false} title="Dobrý den!">
        <DateScroller />
      </RichView>
      <FAB onPress={() => router.push('/new-activity-screen')} />
    </>
  );
}
