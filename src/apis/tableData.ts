import axios from "axios";
export const getTableData = async () => {
  try {
    const response = await axios.get("/api/getallfooditem");
    return response.data;
  } catch (err) {
    return err;
  }
};
