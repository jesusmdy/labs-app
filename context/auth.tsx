import { useSegments, useRouter, useNavigationContainerRef } from "expo-router";
import { useState, useEffect, createContext, useContext, PropsWithChildren, useMemo } from "react";
import { usePocketBase } from "./pocketbase";
import { KNOWN_ROUTES } from "@/utils/routes";
import { TUser } from "@/types/users";

interface IAuthContext {
  user: TUser | undefined;
  isInitialized: boolean;
  isLoggedIn: boolean;
  signOut: () => void;
}

const AuthContext = createContext<IAuthContext>({
  signOut: () => {
    // Default to a no-op function.
  },
} as never);

export function useAuth() {
  return useContext(AuthContext);
}

function useProtectedRoute(user: TUser, isInitialized: boolean) {
  const router = useRouter();
  const segments = useSegments();

  // Check that navigation is all good
  const [isNavigationReady, setIsNavigationReady] = useState(false);
  const rootNavRef = useNavigationContainerRef();

  useEffect(() => {
    const unsubscribe = rootNavRef?.addListener("state", (event) => {
      setIsNavigationReady(true);
    });
    return function cleanup() {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [rootNavRef.current]);

  useEffect(() => {
    if (!isNavigationReady) return;
    const inAuthGroup = segments[0] === KNOWN_ROUTES.identify.login || segments;

    if (!isInitialized) return;

    if (!user && !inAuthGroup) {
      router.replace(KNOWN_ROUTES.identify.login);
    } else if (user && inAuthGroup) {
      router.replace(KNOWN_ROUTES.tabs.inbox);
    }
  }, [user, segments, isNavigationReady, isInitialized]);
}

export function AuthProvider({ children }: PropsWithChildren) {
  const { pb } = usePocketBase();
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<TUser | undefined>();

  const checkAuthStatus = async () => {
    if (pb) {
      const isLoggedIn = pb.authStore.isValid;
      setIsLoggedIn(isLoggedIn);
      setUser(isLoggedIn ? pb.authStore.model as TUser : void null);
      setIsInitialized(true);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, [pb]);

  const appSignOut = async () => {
    if (!pb) return { error: "PocketBase not initialized" };

    try {
      await pb?.authStore.clear();
      setUser(void null);
      setIsLoggedIn(false);
      return { user: null };
    } catch (e) {
      return { error: e };
    }
  };

  useProtectedRoute(user as TUser, isInitialized);

  const valueToProvide = useMemo(
    () => ({
      isLoggedIn,
      isInitialized,
      user,
      signOut: appSignOut,
    }),
    [isLoggedIn, isInitialized, user]
  )

  return (
    <AuthContext.Provider
      value={valueToProvide}
    >
      {children}
    </AuthContext.Provider>
  );
}