import React, { useRef, useState } from 'react';
import GoBackButton from '../../components/GoBackButton';
import { errorToast, successToast } from '../../utils/utils';
import axios from 'axios';
import Loading from '../../components/Loading';
import { router } from '@inertiajs/react';

const Register = () => {
    const [isLoading, setIsLoading] = useState(false);
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    async function handleRegister(e) {
        e.preventDefault();
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;

        if (password.length < 8) {
            errorToast('Password must be 8 characters long');
        } else if (password !== confirmPassword) {
            errorToast('Password didn\'t matched');
        } else {
            setIsLoading(true);
            try {
                const res = await axios.post('/userRegister',
                    { 'name': name, 'email': email, password: password });
                setIsLoading(false)
                successToast(res.data.message);
                router.visit('/login', { method: 'get' })
            } catch (error) {
                setIsLoading(false)
                errorToast(error.response.data.message);
            }
        }

    }

    return (
        isLoading ?
            <Loading />
            : <section className='container' style={{ paddingTop: '6rem' }}>
                <GoBackButton href={'/login'} />

                <div className='d-flex justify-content-center'>
                    <form onSubmit={handleRegister} style={{ maxWidth: '30rem', width: '100%' }}>

                        {/* Title */}
                        <h1 className="h3 mb-3 font-weight-normal text-center mb-4">Register</h1>

                        {/* Name */}
                        <div className='mt-3 mb-3'>
                            <input type='text' ref={nameRef} className="form-control" placeholder="Enter Full Name" required />
                        </div>

                        {/* Email */}
                        <input type="email" ref={emailRef} className="form-control" placeholder="Enter Email" required />

                        {/* Password */}
                        <div className='mt-3 mb-3'>
                            <input type="password" ref={passwordRef} className="form-control" placeholder="Enter Password" required />
                        </div>

                        {/* Confirm Password */}
                        <div className='mt-3 mb-3'>
                            <input type="password" ref={confirmPasswordRef} className="form-control" placeholder="Enter Password" required />
                        </div>

                        {/* Submit */}
                        <button className="btn btn-block mt-1" style={{ padding: '1.3rem' }} type="submit">
                            Register
                        </button>
                    </form>
                </div>
            </section>
    );
};

export default Register;