/* eslint-disable prettier/prettier */
export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_USER_NAME = 'LOGIN_USER_NAME';


export const loginUser = ls => {
  return {
    type: LOGIN_USER,
    loginStatus: ls,
  };
};

export const loginUserName = Name => {
  return {
    type: LOGIN_USER_NAME,
    Name,
    // loginStatus: lss
  };
};
