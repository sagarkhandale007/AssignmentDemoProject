/* eslint-disable prettier/prettier */
const initialState = {
  loginStatus: false,
  name:'',
};

export default (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN_USER":
            return {
                ...state,
                loginStatus: action.loginStatus,
                
              };
              case "LOGIN_USER_NAME":
            return {
                ...state,
                name: action.Name,
                
              };
    default:
          return state;
      }


 
};
