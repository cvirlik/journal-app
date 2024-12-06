import React from 'react';

export type User = {
  name: string;
};

const SelectedUserContext = React.createContext<{
  profile: User | null;
  set: (value: User) => void;
}>({
  profile: null,
  set: () => {},
});

export function SelectedUserProvider(props: React.PropsWithChildren) {
  const [profile, setProfile] = React.useState<User | null>(null);

  return (
    <SelectedUserContext.Provider value={{ profile, set: setProfile }}>
      {props.children}
    </SelectedUserContext.Provider>
  );
}

export function useSelectedUser() {
  const context = React.useContext(SelectedUserContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}
