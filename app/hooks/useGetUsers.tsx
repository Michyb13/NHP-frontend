import { useState, useEffect } from "react";
import { getUsers } from "@/utils/apis/usersApi";
import { useUserContext } from "../context/UserContextProvider";

export type UsersProps = {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  role: string;
  isOnline: boolean;
};

const useGetUsers = () => {
  const { state, dispatch } = useUserContext();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      const response = await getUsers();
      dispatch({ type: "Get Users", payload: response });
      setIsLoading(false);
    };
    fetchUsers();
  }, [dispatch]);
  return { state, isLoading };
};

export default useGetUsers;
