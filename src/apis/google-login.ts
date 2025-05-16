import axios from "axios";

export const googleLogin = async (authCode: any) => {
  try {
    const response = await axios.post("/auth/google-login", {
        authCode: authCode,
    });
    return response.data;
  } catch (err) {
    return err;
  }
};
