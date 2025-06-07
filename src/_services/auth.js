import { useJwt } from "react-jwt";
import { API } from "../_api";

export const login = async ({ email, password }) => {
  try {
    const { data } = await API.post("/login", { email, password });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const register = async (data) => {
  try {
    const response = await API.post("/register", data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const logout = async ({ token, userInfo }) => {
  try {
    const { data } = await API.post(
      "/logout",
      { token, userInfo },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );

    localStorage.removeItem("accessToken");
    localStorage.removeItem("userInfo");
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const useDecodeToken = (token) => {
  const { decodeToken, isExpired } = useJwt(token);

  try {
    if (isExpired) {
      return {
        success: false,
        message: "Token expired",
        data: null,
      };
    }

    return {
      success: true,
      message: "Token valid",
      data: decodeToken,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
      data: null,
    };
  }
};
