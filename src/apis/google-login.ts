import axios from "axios";

export const relogin = async (accessToken: string) => {
  try {
    const response = await axios.post(
      "/auth/relogin",
      null,
      {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      }
    );
    if (response.status !== 200) {
      return new Error("Failed to relogin");
    }
    return response.data;
  } catch (err) {
    return err;
  }
};


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
