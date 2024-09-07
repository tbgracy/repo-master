import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Session } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";

import { supabase } from "./supabase";

type AuthContextType = {
  session?: Session;
  getSession: () => Promise<Session | null>;
  errorMessage?: string;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | undefined>();

  const serverUrl =
    import.meta.env.VITE_APP_URL ||
    `http://localhost:${import.meta.env.VITE_APP_PORT}`;

  const appUrl = `${serverUrl}/app`;

  const navigate = useNavigate();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      setSession(session ?? undefined);
    });
    return () => subscription.unsubscribe();
  }, []);

  const getSession = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!!session) setSession(session);
    return session;
  };

  const signIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        scopes: "repo",
        redirectTo: appUrl,
      },
    });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ session, getSession, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;