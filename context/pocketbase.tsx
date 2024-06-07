import React, { createContext, useContext, useState, useEffect, FC, PropsWithChildren } from 'react';
import PocketBase, { AsyncAuthStore } from 'pocketbase';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IPocketbaseContext {
  pb: PocketBase;
}

const PocketBaseContext = createContext<IPocketbaseContext>({} as never);

const STORAGE_ITEM_NAME = "pb_auth"
const API_URL = "http://192.168.0.100:8090"

export const usePocketBase = () => useContext(PocketBaseContext);

export const PocketBaseProvider: FC<PropsWithChildren> = ({ children }) => {
  const [pb, setPb] = useState<IPocketbaseContext["pb"]>();

  useEffect(() => {
    const initializePocketBase = async () => {
      const initial = AsyncStorage.getItem(STORAGE_ITEM_NAME)
      const store = new AsyncAuthStore({
        initial: initial,
        save: async (serialized) => AsyncStorage.setItem(STORAGE_ITEM_NAME, serialized),
        clear: async () => AsyncStorage.removeItem(STORAGE_ITEM_NAME),
      });
      const pbInstance = new PocketBase(API_URL, store);
      setPb(pbInstance);
    };

    initializePocketBase();
  }, []);
  if (!pb) return void null;
  return (
    <PocketBaseContext.Provider value={{ pb }}>
      {children}
    </PocketBaseContext.Provider>
  );
};
