import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes, userRoutes, adminRoutes } from '~/routes';
import MainLayout from './layouts';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '~/store/userSlice';
import userService from '~/services/userServices';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    const fetchUserFromToken = async () => {
      // Lấy token từ Local Storage
      const storedToken = localStorage.getItem('token');

      // Kiểm tra xem có token hay không
      if (storedToken) {
        try {
          // Gửi token lên server để xác thực
          const { user } = await userService.getUserFromToken(storedToken);

          // Nếu xác thực thành công, cập nhật state của ứng dụng
          dispatch(setUser(user));
        } catch (error) {
          console.error('Error while fetching user:', error);
          // Xử lý lỗi (ví dụ: xóa token nếu không hợp lệ)
          localStorage.removeItem('token');
        }
      }
    };

    fetchUserFromToken();
  }, [dispatch]);

  // Chia các routes thành ba nhóm: public, private (user), admin
  const renderPublicRoutes = () => {
    return (
      <>
        {publicRoutes.map((route, index) => {
          const Layout = route.layout
            ? route.layout
            : route.layout === null
            ? Fragment
            : MainLayout;
          const Page = route.component;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
      </>
    );
  };

  const renderUserRoutes = () => {
    return (
      <>
        {userRoutes.map((route, index) => {
          const Layout = route.layout
            ? route.layout
            : route.layout === null
            ? Fragment
            : MainLayout;
          const Page = route.component;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
      </>
    );
  };

  const renderAdminRoutes = () => {
    return (
      <>
        {adminRoutes.map((route, index) => {
          const Layout = route.layout
            ? route.layout
            : route.layout === null
            ? Fragment
            : MainLayout;
          const Page = route.component;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
      </>
    );
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Dựa trên vai trò người dùng, render các route tương ứng */}
          {user && user.role === 'Admin' && renderAdminRoutes()}
          {user && user.role === 'User' && renderUserRoutes()}
          {!user && renderPublicRoutes()}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
