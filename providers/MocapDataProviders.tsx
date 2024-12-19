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
};

type MocapData = {
  contacts: User[];
  avalibleContacts: User[];
  templates: Templates[];
  tasks: Tasks[];
  actions: Actions[];
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
  data: { contacts: [], avalibleContacts: [], templates: [], tasks: [], actions: [] },
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
        name: 'John Doe',
      },
      {
        name: 'Jane Smith',
        avatarColor: '#464AB7',
      },
      {
        name: 'Mark Johnson',
        avatarColor: '#A1A3F6',
      },
      {
        name: 'Alice Brown',
        avatarColor: '#FFE156',
      },
      {
        name: 'Kate Smith',
        avatarColor: '#DBF4A7',
      },
      {
        name: 'Alex Johnson',
        avatarColor: '#FC6471',
      },
      {
        name: 'Alice Stone',
        avatarColor: '#464AB7',
      },
    ],
    avalibleContacts: [
      {
        name: 'Mom',
        avatarColor: '#A1A3F6',
      },
      {
        name: 'Grandad',
        avatarColor: '#FFE156',
      },
    ],
    templates: [
      { name: 'Cleaning', description: 'Clean your house', repeat: 'day' },
      { name: 'Cooking', description: 'Cook your meals', repeat: 'day' },
      { name: 'Doctor', description: 'Prepare your medication', repeat: 'month' },
      { name: 'Cat', description: 'Feed your cat', repeat: 'week' },
      { name: 'Exercise', description: 'Daily exercise routine', repeat: 'day' },
      { name: 'Reading', description: 'Read a book', repeat: 'week' },
      { name: 'Gardening', description: 'Take care of the garden', repeat: 'month' },
    ],
    tasks: [
      {
        name: 'Morning Run',
        description: 'Go for a run in the morning',
        timeStart: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 8, 0),
        timeEnd: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 0),
        date: today,
        completed: false,
      },
      {
        name: 'Self Care',
        description: 'Spend some time on self-care',
        timeStart: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 0),
        timeEnd: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 15),
        date: today,
        completed: false,
      },
      {
        name: 'Team Meeting',
        description: 'Attend the team meeting',
        timeStart: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 11, 10),
        timeEnd: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12, 0),
        date: today,
        completed: false,
      },
      {
        name: 'Lunch Break',
        description: 'Take a break for lunch',
        timeStart: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 13, 30),
        timeEnd: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 15, 30),
        date: today,
        completed: false,
      },
    ],
    actions: [
      {
        whos: 'John Doe',
        time: '2024-12-05T08:00:00',
        lastAction: 'Living life',
        location: 'New York',
        battery: 12,
        pending: true,
        whoSolve: null,
        note: null,
      },
      {
        whos: 'Jane Smith',
        time: '2024-12-04T18:00:00',
        lastAction: 'Cleaning',
        location: undefined,
        battery: 62,
        pending: false,
        whoSolve: 'Mark Johnson',
        note: null,
      },
      {
        whos: 'Mark Johnson',
        time: '2024-12-05T09:00:00',
        lastAction: 'Sleeping',
        location: 'California',
        battery: 95,
        pending: true,
        whoSolve: null,
        note: null,
      },
      {
        whos: 'Alice Brown',
        time: '2024-12-03T20:00:00',
        lastAction: 'Oaoaoao',
        location: 'London',
        battery: 45,
        pending: false,
        whoSolve: 'Mark Johnson',
        note: 'She was asleep',
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
