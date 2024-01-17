import { Fragment, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes, userRoutes, adminRoutes } from '~/routes';
import MainLayout, { PublicLayout, UserLayout } from './layouts';

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '~/store/userSlice';
import userService from '~/services/userServices';

function App() {
  const dispatch = useDispatch();
  const [roleUser, setRoleUser] = useState('');
  const updateRoleUser = (role) => setRoleUser(role);

  useEffect(() => {
    console.log('useEffect đã được kích hoạt');
    const fetchUserFromToken = async () => {
      // Lấy token từ Local Storage
      const storedToken = localStorage.getItem('token');
      // Kiểm tra xem có token hay không
      if (storedToken) {
        try {
          // Gửi token lên server để xác thực
          const { role, ...user } = await userService.getUserFromToken();
          console.log('Dữ liệu người dùng nhận được:', role, user);
          // Nếu xác thực thành công, cập nhật state của ứng dụng
          // dispatch(setUser(user));
          // setRoleUser(dispatch(setUser(role)).payload);
          // console.log(dispatch(setUser(role)));
          const action = dispatch(setUser(role));
          console.log('Dispatch result:', action);
          updateRoleUser(role);
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
            : PublicLayout;
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
    // Kiểm tra nếu không phải là Admin hoặc User, hiển thị public routes
    if (!roleUser || (roleUser !== 'Admin' && roleUser !== 'User')) {
      return renderPublicRoutes();
    }
    return (
      <>
        {userRoutes.map((route, index) => {
          const Layout = route.layout
            ? route.layout
            : route.layout === null
            ? Fragment
            : UserLayout;
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
    // Kiểm tra nếu không phải là Admin hoặc User, hiển thị public routes
    if (!roleUser || (roleUser !== 'Admin' && roleUser !== 'User')) {
      return renderPublicRoutes();
    }
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
  console.log('roleUser', roleUser);

  const renderRoutes = () => {
    // Kiểm tra xem có token hay không
    const hasToken = Boolean(localStorage.getItem('token'));

    if (hasToken) {
      // Nếu có token, kiểm tra và hiển thị routes phù hợp với vai trò người dùng
      if (roleUser === 'Admin') {
        return renderAdminRoutes();
      } else if (roleUser === 'User') {
        return renderUserRoutes();
      }
    }

    // Nếu không có token hoặc không phải là Admin/User, hiển thị public routes
    return renderPublicRoutes();
  };
  return (
    <Router>
      <div className="App">
        <Routes>{renderRoutes()}</Routes>
      </div>
    </Router>
  );
}

export default App;
