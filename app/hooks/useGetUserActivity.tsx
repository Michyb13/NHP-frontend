import { useState, useEffect } from "react";
import { userActivity } from "@/utils/apis/usersApi";

type ActivityData = {
  online_users: number;
  prediction_count: number;
};

const useGetUserActivity = () => {
  const [data, setData] = useState<ActivityData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchActivity = async () => {
      setIsLoading(true);
      try {
        const activity = await userActivity();
        setData(activity);
      } catch (error) {
        console.error("Failed to fetch user activity", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchActivity();

    // Uncomment and use the setInterval if you need periodic updates
    // const interval = setInterval(fetchActivity, 10000);
    // return () => clearInterval(interval);
  }, []);
  return { data, isLoading };
};

export default useGetUserActivity;
