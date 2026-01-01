import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom';
import NotFound from '../pages/NotFound';
import LodingAnimation from '../components/LodingAnimation';
import UserProtectedRoute from './UserProtectedRoute';
import RecruiterProtectedRoute from './RecruiterProtectedRoute';

const AppRoutes = () => {

    const Home = lazy(() => import("../pages/Home"));
    const JobDetails = lazy(() => import("../pages/JobDetails"));
    const ApplyJob = lazy(() => import("../pages/ApplyJob"));
    const AuthModal = lazy(() => import("../components/AuthModal"));
    const AuthPage = lazy(() => import("../pages/AuthPage"));
    const RecruiterLayout = lazy(() => import("../layouts/RecruiterLayout"));
    const AddJob = lazy(() => import("../pages/AddJob"));
    const ManageJobs = lazy(() => import("../pages/ManageJobs"));
    const ViewApplications = lazy(() => import("../pages/ViewApplications"));
    const ProfileLayout = lazy(() => import("../layouts/ProfileLayout"));
    const MyProfile = lazy(() => import("../pages/profile/MyProfile"));
    const ProfileSecurity = lazy(() => import("../pages/profile/ProfileSecurity"));




    return (
        <Suspense fallback={<LodingAnimation />}>
            <Routes>
                <Route path="auth" element={<AuthPage />} />
                <Route path="/" element={<Home />} />
                <Route path="/job-details/:id" element={<JobDetails />} />
                <Route path="/apply-job" element={<UserProtectedRoute><ApplyJob /></UserProtectedRoute>} />
                <Route path='*' element={<NotFound />} />


                <Route path="/recruiter" element={<RecruiterProtectedRoute><RecruiterLayout /></RecruiterProtectedRoute>}>
                    <Route index element={<AddJob />} />
                    <Route path="/recruiter/add-job" element={<AddJob />} />
                    <Route path="/recruiter/manage-jobs" element={<ManageJobs />} />
                    <Route path="/recruiter/view-applications" element={<ViewApplications />} />
                </Route>

                <Route path="/profile" element={<ProfileLayout />}>
                    <Route index element={<MyProfile />} />
                    <Route path="/profile/my-profile" element={<MyProfile />} />
                    <Route path="/profile/profile-security" element={<ProfileSecurity />} />
                </Route>
            </Routes>
        </Suspense>
    )
}

export default AppRoutes