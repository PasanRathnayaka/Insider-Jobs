import { useAuth } from '../context/AuthProvider';
import { Navigate } from 'react-router-dom';
import LodingAnimation from '../components/LodingAnimation';


const UserProtectedRoute = ({ children }) => {
  const { user, isLoading } = useAuth();

  const roleAccess = ["jobseeker"];

  if (isLoading) {
    return <LodingAnimation />;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (!roleAccess.includes(user.role)) {
    return <Navigate to="/403" replace />;
  }


  return children;
}

export default UserProtectedRoute