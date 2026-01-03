import { useState } from 'react'
import { useAuth } from '../context/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import LodingAnimation from '../components/LodingAnimation';


const UserProtectedRoute = ({ children }) => {
  const { openAuthModal, user, isLoading, isError, setRedirectPathAfterLogin } = useAuth();
  const [authModalOpened, setAuthModalOpened] = useState(false);
  const location = useLocation();

  const roleAccess = ["jobseeker"];


  if (isLoading) {
    return <LodingAnimation />;
  }

  if (!user || isError) {
    return <Navigate to="/auth" replace />;
  }

  if (!roleAccess.includes(user.role)) {
    return <Navigate to="/403" replace />;
  }


  return children;
}

export default UserProtectedRoute