// ValidationUtils.js

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

// Common function to check email and password
const validateEmailAndPassword = (values, errors) => {
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
  } else {
    errors.password = 'Tài khoản hoặc mật khẩu không đúng';
  }
};

// Exported validation functions
export const validation = (values, isForgotPassword) => {
  const errors = {};

  // Use the common function to check email and password
  validateEmailAndPassword(values, errors);

  // Additional checks if needed

  return errors;
};

export const validationSignup = (values) => {
  const errors = {};

  // Check username
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

  return errors;
};

// Exporting the functions
const validationFunctions = { validation, validationSignup };
export default validationFunctions;
