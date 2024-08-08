import axios from "axios";
export const signIn = async (requestObject: {
  username: string;
  password: string;
}) => {
  try {
    const response = await axios.post(
      "https://nhp-backend.onrender.com/login",
      requestObject,
      { withCredentials: true }
    );

    return response.data;
  } catch (error) {
    return { error: error };
  }
};

export const signOut = async () => {
  try {
    const response = await axios.post(
      "https://nhp-backend.onrender.com/logout",
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

export const getUsers = async () => {
  try {
    const response = await axios.get("https://nhp-backend.onrender.com/users", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getAUser = async (id: string | string[] | undefined) => {
  try {
    const response = await axios.get(
      `https://nhp-backend.onrender.com/users/${id}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const addUser = async (
  firstName: string,
  lastName: string,
  username: string,
  role: string,
  password: string
) => {
  const requestObject = {
    firstname: firstName,
    lastname: lastName,
    username: username,
    role: role,
    password: password,
  };
  try {
    const response = await axios.post(
      "https://nhp-backend.onrender.com/users",
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

export const editUser = async (
  requestObject: {
    firstName: string;
    lastName: string;
    username: string;
    role: string;
    password: string;
  },
  id: string | string[] | undefined
) => {
  try {
    const response = await axios.put(
      `https://nhp-backend.onrender.com/users/${id}`,
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

export const deleteUser = async (id: string | string[] | undefined) => {
  try {
    const response = await axios.delete(
      `https://nhp-backend.onrender.com/users/${id}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const userActivity = async () => {
  try {
    const response = await axios.get(
      "https://nhp-backend.onrender.com/useractivity",
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    return error;
  }
};
