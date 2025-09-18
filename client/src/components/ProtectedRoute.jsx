import React, { use, useEffect, useState } from 'react'
import { useAuth } from '../context/AuthProvider'
import { Navigate, useLocation } from 'react-router-dom';
import LodingAnimation from './LodingAnimation';


const ProtectedRoute = ({ children }) => {
  const { openAuthModal, user, isLoading, setRedirectPathAfterLogin } = useAuth();
  const [authModalOpened, setAuthModalOpened] = useState(false);
  const location = useLocation();

  const roleAccess = ["user"];

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

  if (!user) {
    setRedirectPathAfterLogin(location.pathname);
    openAuthModal();
    return null;
  }

  if (!roleAccess.includes(user.role)) {
    return <Navigate to={"*"} />
  }


  return children;

}

export default ProtectedRoute