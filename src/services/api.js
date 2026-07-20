import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const unwrapResponse = (response) => response?.data?.data ?? response?.data ?? response;

export const uploadResume = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await apiClient.post('/upload-resume', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return unwrapResponse(response);
};

// export const analyzeResume = async (file) => {
//   const formData = new FormData();
//   formData.append('file', file);

//   const response = await apiClient.post('/analyze', formData, {
//     headers: { 'Content-Type': 'multipart/form-data' },
//   });

//   return unwrapResponse(response);
// };
export const analyzeResume = async (file, targetRole, industry) => {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("target_role", targetRole);
  formData.append("industry", industry);

  const response = await apiClient.post(
    "/analyze",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return unwrapResponse(response);
};
export const getAnalysis = async (id) => {
  const response = await apiClient.get(`/analysis/${id}`);
  return unwrapResponse(response);
};

export const getHistory = async () => {
  const response = await apiClient.get('/history');
  return unwrapResponse(response);
};

export const loginUser = async (email, password) => {

  console.log("LOGIN REQUEST");

  console.log({
    email,
    password
  });

  const response = await apiClient.post("/auth/login", {
    email: email,
    password: password
  });

  console.log("LOGIN RESPONSE");

  console.log(response.data);

  return unwrapResponse(response);
};

export const signupUser = async (name, email, password) => {
  const response = await apiClient.post('/auth/signup', { name, email, password });
  return unwrapResponse(response);
};

export const getCurrentUser = async () => {
  const response = await apiClient.get('/auth/me');
  return unwrapResponse(response);
};

export const updateProfileSettings = async (settings) => {
  const response = await apiClient.patch('/profile/settings', settings);
  return unwrapResponse(response);
};

export const logoutUser = async () => {
  await apiClient.post('/auth/logout');
};

export default apiClient;
