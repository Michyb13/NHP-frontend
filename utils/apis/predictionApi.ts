import axios from "axios";

export const makePrediction = async (
  customerId: string,
  month: string,
  year: number | undefined
) => {
  const requestObject = {
    card_code: customerId,
    month: month,
    year: year,
    predId: (Math.random() + 1).toString(36).substring(7),
  };
  try {
    const response = await axios.post(
      "https://nhp-backend.onrender.com/predrevenue",
      requestObject,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    return { error: error };
  }
};

export const getPastSales = async (customerId: string) => {
  const requestObject = {
    card_code: customerId,
  };
  try {
    const response = await axios.post(
      "https://nhp-backend.onrender.com/pastsales",
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
