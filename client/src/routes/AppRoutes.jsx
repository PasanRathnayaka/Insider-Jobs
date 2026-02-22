import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom';
import NotFound from '../pages/NotFound';
import LodingAnimation from '../components/LodingAnimation';
import UserProtectedRoute from './UserProtectedRoute';
import RecruiterProtectedRoute from './RecruiterProtectedRoute';
import Forbidden from '../pages/Forbidden';
import ProfileProtectedRoute from '../components/ProfileProtectedRoute';

const AppRoutes = () => {

    const Home = lazy(() => import("../pages/Home"));
    const JobDetails = lazy(() => import("../pages/JobDetails"));
    const ApplyJob = lazy(() => import("../pages/ApplyJob"));
    const AuthPage = lazy(() => import("../pages/AuthPage"));
    const RecruiterLayout = lazy(() => import("../layouts/RecruiterLayout"));
    const AddJob = lazy(() => import("../pages/AddJob"));
    const ManageJobs = lazy(() => import("../pages/ManageJobs"));
    const ViewApplicants = lazy(() => import("../pages/ViewApplicants"));
    const ProfileLayout = lazy(() => import("../layouts/ProfileLayout"));
    const MyProfile = lazy(() => import("../pages/profile/MyProfile"));
    const ProfileSecurity = lazy(() => import("../pages/profile/ProfileSecurity"));
    const NotificationPage = lazy(() => import("../pages/NotificationPage"));




    return (
        <Suspense fallback={<LodingAnimation />}>
            <Routes>
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/" element={<Home />} />
                <Route path="/job-details/:id" element={<JobDetails />} />
                <Route path="/notifications" element={<UserProtectedRoute><NotificationPage /></UserProtectedRoute>} />

                <Route path="/apply-job" element={<UserProtectedRoute><ApplyJob /></UserProtectedRoute>} />

                <Route path="/recruiter" element={<RecruiterProtectedRoute><RecruiterLayout /></RecruiterProtectedRoute>}>
                    <Route index element={<AddJob />} />
                    <Route path="add-job" element={<AddJob />} />
                    <Route path="manage-jobs" element={<ManageJobs />} />
                    <Route path="view-applicants" element={<ViewApplicants />} />
                </Route>

                <Route path="/profile" element={<ProfileProtectedRoute><ProfileLayout /></ProfileProtectedRoute>}>
                    <Route index element={<MyProfile />} />
                    <Route path="my-profile" element={<MyProfile />} />
                    <Route path="profile-security" element={<ProfileSecurity />} />
                </Route>

                <Route path='/not-found' element={<NotFound />} />
                <Route path='*' element={<NotFound />} />
                <Route path='/403' element={<Forbidden />} />
            </Routes>
        </Suspense>
    )
}

export default AppRoutes