import React, { useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';

const Register = () => {
    let errorElement;
    const nameRef = useRef('');
    const emailRef = useRef('');
    const passwordRef = useRef('');
    const confirmPasswordRef = useRef('');
    const [agree, setAgree] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true }); // email verification

    const [updateProfile, updating, updateError] = useUpdateProfile(auth);

    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || "/";

    if (loading || updating) {
        return <Loading></Loading>
    }

    if (user) {
        navigate(from, { replace: true });
    }

    if (error || updateError || passwordError) {
        errorElement = <p className='text-danger'>Error: {error?.message} {updateError?.message} {passwordError}</p>
    }

    const handleRegister = async (event) => {
        event.preventDefault();

        // taking values from the input fields 
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;

        if (password !== confirmPassword) {
            setPasswordError("Your two passwords didn't match"); // when passwords don't match
            return;
        }
        if (password.length < 6) {
            setPasswordError("Password must be of 6 characters or longer"); // when password is less than 6 characters
            return;
        }

        await createUserWithEmailAndPassword(email, password); // register using react firebase hooks
        await updateProfile({ displayName: name }); // update profile using react firebase hooks
        console.log('Updated profile');
        // navigate('/home');
        // navigate(from, { replace: true }); //navigate to previous
    }
    return (
        <div className='container w-50 mx-auto'>
            <h2 className=' text-center mt-2'>Please Register</h2>
            <Form onSubmit={handleRegister}>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Control ref={nameRef} type="text" placeholder="Your Name" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control ref={emailRef} type="email" placeholder="Enter email" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control ref={passwordRef} type="password" placeholder="Enter Password (6 characters or longer)" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                    <Form.Control ref={confirmPasswordRef} type="password" placeholder="Confirm Password" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check onClick={() => setAgree(!agree)} className={`${agree ? '' : 'text-danger'}`} type="checkbox" label="Accept terms and conditions" />
                </Form.Group>
                <Button disabled={!agree} variant="dark w-50 mx-auto d-block mb-2" type="submit">Register</Button>
            </Form>
            {errorElement}
            <p className='mt-3'>Already have an account? <Link to="/login" className='text-primary pe-auto text-decoration-none'>Please Login</Link> </p>
        </div>
    );
};

export default Register;