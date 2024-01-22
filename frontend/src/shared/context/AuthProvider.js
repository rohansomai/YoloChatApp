import { useEffect, useReducer } from 'react';
import { AuthContext } from './AuthContext';

const actionTypes = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
};

const initialState = {
  isAuthenticated: false,
  user: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        isAuthenticated: true,
        user: action.payload,
      };
    case actionTypes.LOGOUT:
      return {
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = (user) => {
    localStorage.setItem('authUser', JSON.stringify(user));
    dispatch({ type: actionTypes.LOGIN, payload: user });
  };

  const logout = () => {
    localStorage.removeItem('authUser');
    dispatch({ type: actionTypes.LOGOUT });
  };

  useEffect(() => {
    // Retrieve user information from localStorage on application load
    const storedUser = localStorage.getItem('authUser');
    if (storedUser) {
      dispatch({ type: actionTypes.LOGIN, payload: JSON.parse(storedUser) });
    }
  }, []);

  return <AuthContext.Provider value={{ ...state, login, logout }}>{children}</AuthContext.Provider>;
};
