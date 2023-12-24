export const validation = (values) => {
  const errors = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

  if (!values.username) {
    errors.username = 'Tên đăng nhập không được để trống';
  }

  if (!values.email) {
    errors.email = 'Email không được để trống';
  } else if (!emailPattern.test(values.email)) {
    errors.email = 'Email không hợp lệ';
  }

  if (!values.password) {
    errors.password = 'Mật khẩu không được để trống';
  } else if (values.password.length < 6) {
    errors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
  } else if (!passwordPattern.test(values.password)) {
    errors.password =
      'Mật khẩu phải bao gồm ít nhất một chữ thường, một chữ hoa và một số';
  }

  // Thêm các kiểm tra khác nếu cần

  return errors;
};

export default validation;
