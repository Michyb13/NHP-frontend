import axios from "axios";

export const saveHistory = async (result: {
  customerId: string;
  month: string;
  year: number;
  prediction: number;
}) => {
  const { customerId, month, year, prediction } = result;
  const requestObject = {
    card_code: customerId,
    month: month,
    year: year,
    prediction: prediction,
    timestamp: new Date().toISOString(),
  };
  try {
    const response = await axios.post(
      "https://nhp-backend.onrender.com/history",
      requestObject,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getHistory = async () => {
  try {
    const response = await axios.get(
      "https://nhp-backend.onrender.com/history",
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const clearHistory = async () => {
  try {
    const response = await axios.post(
      "https://nhp-backend.onrender.com/clear-history",
      {},
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const downloadHistory = async () => {
  try {
    const response = await axios.get(
      "https://nhp-backend.onrender.com/download-history",
      {
        responseType: "blob",
        withCredentials: true,
      }
    );
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "past_requests.xlsx");
    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);
  } catch (error) {
    console.error("Error downloading Excel file:", error);
  }
};
