import React, { useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

const RecruiterProtectedRoute = ({ children }) => {
  const { openAuthModal, user, isLoading, setRedirectPathAfterLogin } = useAuth();
  const [authModalOpened, setAuthModalOpened] = useState(false);
  const location = useLocation();

  const roleAccess = ["recruiter", "admin"];

  // useEffect(() => {
  //   if (!user && !authModalOpened) {
  //     openAuthModal();
  //     setAuthModalOpened(true);
  //   }

  // }, [user, authModalOpened, openAuthModal])


  // if (isLoading) {
  //   return <LodingAnimation />;
  // }

  // if (!user) return <Navigate to={"/"} />;

  // const hasAccess = user?.role === role;

  // if (!hasAccess) return <Navigate to={"*"} />

  // if (!user) {
  //   setRedirectPathAfterLogin(location.pathname);
  //   openAuthModal();
  //   return null;
  // }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (!roleAccess.includes(user.role)) {
    return <Navigate to={"*"} />
  }


  return children;
}

export default RecruiterProtectedRoute