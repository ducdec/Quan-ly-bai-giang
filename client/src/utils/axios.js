import axios from 'axios';

const request = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'content-type': 'application/json',
    //Authorization: `Bearer ${token}`,
  },
});
// Add an interceptor for every request
request.interceptors.request.use(
  (config) => {
    // Kiểm tra xem có token đã được lưu trong localStorage không
    const token = localStorage.getItem('token');

    // Nếu có token, thêm Authorization header vào yêu cầu
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Xử lý lỗi request
    return Promise.reject(error);
  },
);
export default request;
