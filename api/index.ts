import AsyncStorage from "@react-native-async-storage/async-storage";
import PocketBase, { AsyncAuthStore } from "pocketbase";
import eventsource from "react-native-sse";

// @ts-ignore
global.EventSource = eventsource;

const STORAGE_ITEM_NAME = "pb_auth";
const API_URL = "http://127.0.0.1:8090"; // "http://192.168.0.100:8090"

const store = new AsyncAuthStore({
  save: async (serialized) =>
    AsyncStorage.setItem(STORAGE_ITEM_NAME, serialized),
  clear: async () => AsyncStorage.removeItem(STORAGE_ITEM_NAME),
  initial: AsyncStorage.getItem(STORAGE_ITEM_NAME),
});

const pb = new PocketBase(API_URL, store);

export default pb;
