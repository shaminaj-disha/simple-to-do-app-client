import React from 'react';
import { useAuthState, useSendEmailVerification } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';

const RequireAuth = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const location = useLocation();
  const [sendEmailVerification] = useSendEmailVerification(auth);

  if (loading) {
    return <Loading></Loading>
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (user.providerData[0]?.providerId === 'password' && !user.emailVerified) {
    return <div className='text-center mt-5'>
        <h3 className='text-danger my-3'>Your email account is not verified!!!</h3>
        <h5 className='text-warning mb-4'> Please verify your email address</h5>
        <button
        className='btn btn-dark'
            onClick={async () => {
                await sendEmailVerification();
                toast('Email Sent');
            }}
        >
            Send Email Verification Again
        </button>
    </div>
}

  return children;
};

export default RequireAuth;