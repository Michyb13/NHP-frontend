"use client";
import {
  useEffect,
  useReducer,
  createContext,
  useContext,
  ReactNode,
  Dispatch,
} from "react";
import { UsersProps } from "../hooks/useGetUsers";

type UserContextProps = {
  children: ReactNode;
};

type UserState = {
  users: UsersProps[];
};
type UserAction =
  | { type: "Get Users"; payload: UsersProps[] }
  | { type: "Add Users"; payload: UsersProps }
  | { type: "Edit User"; payload: UsersProps }
  | { type: "Delete User"; payload: UsersProps };

type ValueProps = {
  state: UserState;
  dispatch: Dispatch<UserAction>;
};

export const userContext = createContext<ValueProps | null>(null);

const reducer = (state: UserState, action: UserAction) => {
  switch (action.type) {
    case "Get Users":
      return {
        ...state,
        users: action.payload,
      };
    case "Add Users":
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case "Edit User":
      return {
        ...state,
        users: state.users.map((user) =>
          user._id === action.payload._id ? action.payload : user
        ),
      };
    case "Delete User":
      return {
        ...state,
        users: state.users.filter((user) => user._id !== action.payload._id),
      };
  }
};

const UserContextProvider = ({ children }: UserContextProps) => {
  const initialState: UserState = {
    users: [],
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <userContext.Provider value={{ state, dispatch }}>
      {children}
    </userContext.Provider>
  );
};

export default UserContextProvider;

export const useUserContext = () => {
  const context = useContext(userContext);
  if (context === null) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }

  return context;
};
