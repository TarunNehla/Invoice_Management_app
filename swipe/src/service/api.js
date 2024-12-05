import axios from 'axios';

const API_URI = 'http://localhost:5000';

export const uploadFile = async (data) => {
  try {
    const response = await axios.post(`${API_URI}/api/upload`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return response.data;
  } catch (error) {
    console.error('Error uploading file:', error.message);
    throw error;
  }
};
