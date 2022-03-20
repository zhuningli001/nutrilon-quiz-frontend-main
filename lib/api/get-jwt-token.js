import axios from "axios";

// Create a new player and update player info requires JWT auth
const getJWTToken = async () => {
  try {
    const response = await axios.post(`${process.env.BACKEND}/auth/local`, {
      identifier: process.env.AUTHNAME,
      password: process.env.AUTHPASSWORD,
    });

    if (!response || !response.data.jwt)
      throw new Error("Failed at retrieving auth token");

    return response.data.jwt;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getJWTToken;
