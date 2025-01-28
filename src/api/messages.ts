import axios from "axios";

export const sendMessage = async (data: { messages: string }) => {
  try {
    const response = await axios.post(`/api/ask`, data);
    return response?.data;
  } catch {
    throw new Error("Error in sendMessage");
  }
};
