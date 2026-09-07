import { Navigate } from 'react-router';
import { isAuthenticated } from '../utils/authUtils';

interface ProtectedRouteProps {
  element: React.ReactNode;
}

export default function ProtectedRoute({ element }: ProtectedRouteProps) {
  return isAuthenticated() ? element : <Navigate to="/auth/login" replace />;
}
