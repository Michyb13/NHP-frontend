import { useState, useEffect } from "react";
import { getAUser } from "@/utils/apis/usersApi";
import { UsersProps } from "./useGetUsers";

const useGetUser = (id: string | string[] | undefined) => {
  const [user, setUser] = useState<UsersProps | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      const response = await getAUser(id);
      setUser(response);
      setIsLoading(false);
    };
    fetchUser();
  }, [id]);
  return { user, isLoading };
};

export default useGetUser;
