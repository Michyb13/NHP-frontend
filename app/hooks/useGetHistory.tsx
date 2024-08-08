import { useState, useEffect } from "react";
import { getHistory, clearHistory } from "@/utils/apis/historyApi";
type HistoryProps = {
  _id: string;
  cardCode: string;
  month: string;
  year: number;
  prediction: number;
};

const useGetHistory = () => {
  const [history, setHistory] = useState<HistoryProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getHistory();
        setHistory(response);
      } catch (error) {
        console.error("Failed to fetch history:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const clearRequest = async () => {
    try {
      const response = await clearHistory();

      setHistory([]);
    } catch (error) {
      console.error(error);
    }
  };

  return { history, isLoading, clearRequest };
};

export default useGetHistory;
