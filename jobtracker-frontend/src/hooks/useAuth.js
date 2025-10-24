import { useSelector, useDispatch } from 'react-redux';
import { clearAuth } from '../store/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, token, isLoading, error } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(clearAuth());
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  };

  return {
    user,
    token,
    isLoading,
    error,
    isAuthenticated: !!token,
    logout: handleLogout,
  };
};
