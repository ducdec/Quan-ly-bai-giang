import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '~/store/userSlice';
import useCustomHook from '~/store/CustomHook';

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

// request.interceptors.response.use(async (response) => {
//   const userState = useSelector((state) => state.data);
//   // const dispatch = useDispatch();
//   //
//   if (!userState) {
//     const data = await request.get('/users/getToken');
//   }
//   console.log('Line 36 : ');
//   // dispatch(setUser(data));

//   return response;
// });
export default request;
