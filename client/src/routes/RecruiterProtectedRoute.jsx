import { Navigate} from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

const RecruiterProtectedRoute = ({ children }) => {
  const { user, isLoading} = useAuth();

  const roleAccess = ["recruiter"];

  if (isLoading) {
    return <LodingAnimation />;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (!roleAccess.includes(user.role)) {
    return <Navigate to={"/403"} />
  }


  return children;
}

export default RecruiterProtectedRoute