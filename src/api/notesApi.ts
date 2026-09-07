import axiosInstance from "./axiosConfig";

const API_URL = import.meta.env.VITE_NOTES_API_URI;



export const createNoteAPi = async (data: any) => {
  const response = await axiosInstance.post(`${API_URL}/create`, data);

  return response.data;
};

export const getAllNotes = async () => {
  const response = await axiosInstance.get(`${API_URL}/allNotes`);

  console.log("innner API   ",response.data);
  return response.data
  
};

export const deleteNotesApi = async (noteId: string) => {
  const response = await axiosInstance.delete(`${API_URL}/delete/${noteId}`);

  return response
}
