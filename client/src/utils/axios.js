import axios from 'axios';
import configureAppStore from '~/store/configStore';
import { useDispatch } from 'react-redux';
const store = configureAppStore();
// import { setUser } from '~/store/userSlice';
// import useCustomHook from '~/store/CustomHook';

// const useCustomHook = () => {
//   const dispatch = useDispatch();
//   const userState = useSelector((state) => state.user);

//   const updateUser = (userData) => {
//     dispatch(setUser(userData));
//   };

//   return {
//     userState,
//     updateUser,
//   };
// };
//const { updateUser } = useCustomHook();
const request = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'content-type': 'application/json',
    //Authorization: `Bearer ${token}`,
  },
});
// Add an interceptor for every request
request.interceptors.request.use(
  async (config) => {
    // Kiểm tra xem có token đã được lưu trong localStorage không
    const token = localStorage.getItem('token');

    // Nếu có token, thêm Authorization header vào yêu cầu
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // const { data } = store.getState();
    // if (Object.getOwnPropertyNames(data).length === 0) {
    //   const data = await request.get('/users/getToken');
    //   console.log('Line 51 : ', data);
    // }
    return config;
  },
  (error) => {
    // Xử lý lỗi request
    return Promise.reject(error);
  },
);
let isInterceptorCalled = false;
request.interceptors.response.use(
  async (res) => {
    const { data } = store.getState();
    if (!isInterceptorCalled && Object.getOwnPropertyNames(data).length === 0) {
      isInterceptorCalled = true;
      console.log();
      try {
        const response = await request.get('users/getToken');
        // Xử lý response và lưu trữ token nếu cần
        // sessionStorage.setItem('token', response.data.access_token);
      } catch (error) {
        // Xử lý lỗi nếu có
      }
    }
    return res;
  },
  async (error) => {
    return Promise.reject(error);
  },
);
export default request;
