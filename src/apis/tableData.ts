import axios from "axios";
export const getTableData = async (lang: string) => {
  try {
    const response = await axios.get(`/api/getallfooditem?lang=${lang}`);
    return response.data;
  } catch (err) {
    return err;
  }
};
