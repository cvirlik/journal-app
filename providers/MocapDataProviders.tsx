import type { ImageRequireSource } from 'react-native';
import React, { useState } from 'react';

export type User = {
  name: string;
  avatarColor: string;
};

type Templates = {
  name: string;
  description: string;
  repeat: 'day' | 'month' | 'year' | 'week' | undefined;
};

type Tasks = {
  name: string;
  description: string;
  timeStart: Date;
  timeEnd: Date;
  date: Date;
  completed: boolean;
};

export type Actions = {
  whos: string;
  lastAction: string;
  time: string;
  location: string | undefined;
  battery: number;
  pending: boolean;
  whoSolve: string | null;
  note: string | null;
  solveOnDate: Date | null;
};

type Photos = {
  image: ImageRequireSource;
};

type MocapData = {
  contacts: User[];
  avalibleContacts: User[];
  templates: Templates[];
  tasks: Tasks[];
  actions: Actions[];
  photos: Photos[];
};

const MocapDataContext = React.createContext<{
  data: MocapData;
  addItem: <T extends keyof MocapData>(key: T, item: MocapData[T][number]) => void;
  editItem: <T extends keyof MocapData>(
    key: T,
    index: number,
    updatedItem: MocapData[T][number],
  ) => void;
  deleteItem: <T extends keyof MocapData>(key: T, index: number) => void;
}>({
  data: { contacts: [], avalibleContacts: [], templates: [], tasks: [], actions: [], photos: [] },
  addItem: () => {},
  editItem: () => {},
  deleteItem: () => {},
});

export function MocapDataProvider(props: React.PropsWithChildren) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [data, setData] = useState<MocapData>({
    contacts: [
      {
        avatarColor: '#FC6471',
        name: 'Jan Novák',
      },
      {
        name: 'Petr Svoboda',
        avatarColor: '#464AB7',
      },
      {
        name: 'Martin Dvořák',
        avatarColor: '#A1A3F6',
      },
      {
        name: 'Tomáš Král',
        avatarColor: '#FFE156',
      },
      {
        name: 'Jakub Procházka',
        avatarColor: '#DBF4A7',
      },
      {
        name: 'Lukáš Veselý',
        avatarColor: '#FC6471',
      },
      {
        name: 'Ondřej Černý',
        avatarColor: '#464AB7',
      },
    ],
    avalibleContacts: [
      {
        name: 'Máma',
        avatarColor: '#A1A3F6',
      },
      {
        name: 'Táta',
        avatarColor: '#FFE156',
      },
    ],
    templates: [
      { name: 'Úklid', description: 'Ukliďte svůj dům', repeat: 'day' },
      { name: 'Vaření', description: 'Uvařte si jídlo', repeat: 'day' },
      { name: 'Doktor', description: 'Připravte si léky', repeat: 'month' },
      { name: 'Kočka', description: 'Nakrmte svou kočku', repeat: 'week' },
      { name: 'Cvičení', description: 'Denní cvičební rutina', repeat: 'day' },
      { name: 'Čtení', description: 'Přečtěte si knihu', repeat: 'week' },
      { name: 'Zahradničení', description: 'Postarejte se o zahradu', repeat: 'month' },
    ],
    tasks: [
      {
        name: 'Ranní běh',
        description: 'Jděte si zaběhat ráno',
        timeStart: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 8, 0),
        timeEnd: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 0),
        date: today,
        completed: false,
      },
      {
        name: 'Péče o sebe',
        description: 'Věnujte čas péči o sebe',
        timeStart: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 0),
        timeEnd: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 15),
        date: today,
        completed: false,
      },
      {
        name: 'Týmová schůzka',
        description: 'Zúčastněte se týmové schůzky',
        timeStart: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 11, 10),
        timeEnd: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12, 0),
        date: today,
        completed: false,
      },
      {
        name: 'Přestávka na oběd',
        description: 'Dejte si přestávku na oběd',
        timeStart: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 13, 30),
        timeEnd: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 15, 30),
        date: today,
        completed: false,
      },
    ],
    actions: [
      {
        whos: 'Jan Novák',
        time: new Date(new Date().getTime() - 5 * 60 * 60 * 1000).toISOString(),
        lastAction: 'Žíl život',
        location: 'Praha',
        battery: 12,
        pending: true,
        whoSolve: null,
        note: null,
        solveOnDate: null,
      },
      {
        whos: 'Petr Svoboda',
        time: '2024-12-04T18:00:00',
        lastAction: 'Úklid',
        location: 'Brno',
        battery: 62,
        pending: false,
        whoSolve: 'Martin Dvořák',
        note: null,
        solveOnDate: new Date(new Date().setDate(new Date().getDate() - 2)),
      },
      {
        whos: 'Martin Dvořák',
        time: new Date(new Date().getTime() - 2 * 60 * 60 * 1000).toISOString(),
        lastAction: 'Spánek',
        location: 'Ostrava',
        battery: 95,
        pending: true,
        whoSolve: null,
        note: null,
        solveOnDate: null,
      },
      {
        whos: 'Tomáš Král',
        time: '2024-12-03T20:00:00',
        lastAction: 'Oaoaoao',
        location: 'Plzeň',
        battery: 45,
        pending: false,
        whoSolve: 'Martin Dvořák',
        note: 'Spal',
        solveOnDate: new Date(new Date().setDate(new Date().getDate() - 1)),
      },
    ],
    photos: [
      {
        image: require('../assets/images/photos/0.jpg'),
      },
      {
        image: require('../assets/images/photos/1.jpg'),
      },
      {
        image: require('../assets/images/photos/2.jpg'),
      },
      {
        image: require('../assets/images/photos/3.jpg'),
      },
      {
        image: require('../assets/images/photos/4.jpg'),
      },
      {
        image: require('../assets/images/photos/5.jpg'),
      },
      {
        image: require('../assets/images/photos/6.jpg'),
      },
      {
        image: require('../assets/images/photos/7.jpg'),
      },
      {
        image: require('../assets/images/photos/8.jpg'),
      },
    ],
  });

  const addItem = <T extends keyof MocapData>(key: T, item: MocapData[T][number]) => {
    setData(prev => ({
      ...prev,
      [key]: [...prev[key], item],
    }));
  };

  const editItem = <T extends keyof MocapData>(
    key: T,
    index: number,
    updatedItem: MocapData[T][number],
  ) => {
    setData(prev => ({
      ...prev,
      [key]: prev[key].map((item, i) => (i === index ? updatedItem : item)),
    }));
  };

  const deleteItem = <T extends keyof MocapData>(key: T, index: number) => {
    setData(prev => ({
      ...prev,
      [key]: prev[key].filter((_, i) => i !== index),
    }));
  };

  return (
    <MocapDataContext.Provider value={{ data, addItem, editItem, deleteItem }}>
      {props.children}
    </MocapDataContext.Provider>
  );
}

export function useMocapData() {
  const context = React.useContext(MocapDataContext);
  if (!context) {
    throw new Error('useMocapData must be used within a MocapDataProvider');
  }
  return context;
}
