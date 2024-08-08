"use client";
import {
  useReducer,
  useEffect,
  createContext,
  useContext,
  ReactNode,
  Dispatch,
} from "react";
type AuthUser = {
  id: string;
  username: string;
  role: string;
};
type AuthContextProviderProps = {
  children: ReactNode;
};

type AuthState = {
  user: AuthUser;
};

type AuthAction = { type: "Log In"; payload: AuthUser } | { type: "Log Out" };

type AuthContextProps = {
  state: AuthState;
  dispatch: Dispatch<AuthAction>;
};

const reducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case "Log In":
      return {
        ...state,
        user: action.payload,
      };
    case "Log Out":
      return {
        ...state,
        user: {
          id: "",
          username: "",
          role: "",
        },
      };
  }
};

export const authContext = createContext<AuthContextProps | null>(null);
const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const initialState: AuthState = {
    user: {
      id: "",
      username: "",
      role: "",
    },
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      dispatch({ type: "Log In", payload: JSON.parse(currentUser) });
    }
  }, []);

  return (
    <authContext.Provider value={{ state, dispatch }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuthContext = () => {
  const context = useContext(authContext);
  if (!context) {
    throw Error("useAuthContext must be used within useAuthContextProvider");
  }
  return context;
};
