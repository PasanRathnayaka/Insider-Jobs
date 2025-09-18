import React, { useState } from 'react'
import { useAuth } from '../context/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import LodingAnimation from '../components/LodingAnimation';

const UserProtectedRoute = ({children}) => {
   const { openAuthModal, user, isLoading, setRedirectPathAfterLogin } = useAuth();
  const [authModalOpened, setAuthModalOpened] = useState(false);
  const location = useLocation();

  const roleAccess = ["user","admin"];

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

  // if(isLoading){
  //   return <LodingAnimation/>
  // }

  if (!user) {
    setRedirectPathAfterLogin(location.pathname);
    openAuthModal();

    return null;
  }

  console.log("USER in UserProtecedRoute: ", user);
 if(user){
  console.warn("USER TRUE");
 }

  if (user.role !== "user" && user.role !== "admin") {
    return <Navigate to="/" />
  }


  return children;
}

export default UserProtectedRoute