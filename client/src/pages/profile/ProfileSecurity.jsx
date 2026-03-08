import { useState } from 'react';
import { useAuth } from '../../context/AuthProvider';

const ProfileSecurity = () => {
  const { user } = useAuth();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('All fields are required.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('New password and confirm password do not match.');
      return;
    }

    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters long.');
      return;
    }

    setIsSubmitting(true);
    try {
      // Mock API Call here for actually updating password in backend. 
      // We just simulate success since this is frontend UX mock update.
      await new Promise(resolve => setTimeout(resolve, 1500));

      setSuccess('Password changed successfully.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError('An error occurred while changing your password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='w-full max-w-4xl mx-auto'>
      <div className='mb-6 md:mb-8'>
        <p className='text-2xl md:text-3xl font-semibold text-gray-800 tracking-tight'>
          Security Settings
        </p>
        <p className='text-gray-500 mt-2'>Manage your password and account securing options.</p>
      </div>

      <div className='bg-white flex flex-col border border-gray-100 shadow-sm rounded-xl overflow-hidden'>

        <div className='p-6 md:p-8 flex flex-col text-sm border-b border-gray-100 bg-gray-50/50'>
          <h3 className='text-lg font-medium text-gray-800 mb-1'>Change Password</h3>
          <p className='text-gray-500'>Update your password associated with your account.</p>
        </div>

        <form onSubmit={handleSubmit} className='p-6 md:p-8 flex flex-col gap-6'>

          {error && (
            <div className='w-full p-4 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100'>
              {error}
            </div>
          )}

          {success && (
            <div className='w-full p-4 bg-green-50 text-green-600 rounded-lg text-sm border border-green-100'>
              {success}
            </div>
          )}

          <div className='w-full max-w-md'>
            <label className='block text-sm font-medium text-gray-700 mb-2'>Current Password</label>
            <input
              type='password'
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all'
              placeholder='Enter current password'
            />
          </div>

          <div className='w-full max-w-md mt-2'>
            <label className='block text-sm font-medium text-gray-700 mb-2'>New Password</label>
            <input
              type='password'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all'
              placeholder='Enter new password'
            />
          </div>

          <div className='w-full max-w-md'>
            <label className='block text-sm font-medium text-gray-700 mb-2'>Confirm New Password</label>
            <input
              type='password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all'
              placeholder='Confirm new password'
            />
            <p className='text-xs text-gray-400 mt-2'>Minimum 6 characters required.</p>
          </div>

          <hr className='border-gray-100 my-2' />

          <div className='flex items-center'>
            <button
              type='submit'
              disabled={isSubmitting}
              className={`px-8 py-3 rounded-lg font-medium transition-all text-white shadow-sm ${isSubmitting
                  ? 'bg-blue-400 cursor-wait'
                  : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
                }`}
            >
              {isSubmitting ? 'Updating...' : 'Update Password'}
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default ProfileSecurity