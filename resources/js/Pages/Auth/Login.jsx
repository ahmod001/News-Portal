import { Link, router } from '@inertiajs/react';
import React, { useRef, useState } from 'react';
import { errorToast, successToast } from '../../utils/utils';
import GoBackButton from '../../components/GoBackButton';
import axios from 'axios';
import Loading from '../../components/Loading';

const Login = () => {
    const [isLoading, setIsLoading] = useState(false);
    const emailRef = useRef();
    const passwordRef = useRef();

    async function handleLogin(e) {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        setIsLoading(true)
        try {
            const res = await axios.post('/userLogin', { 'email': email, password: password });
            setIsLoading(false)
            successToast(res.data.message);
            setTimeout(() => router.visit('/', { method: 'get' }), 1000)
        } catch (error) {
            setIsLoading(false)
            errorToast('Email/Password is invalid');
        }
    }
    return (
        isLoading ?
            (<Loading />)
            : (<section className='container' style={{ paddingTop: '6rem' }}>
                <GoBackButton href={'/'} />

                <div className='d-flex justify-content-center'>

                    <form style={{ maxWidth: '30rem', width: '100%' }} onSubmit={handleLogin}>

                        {/* Title */}
                        <h1 className="h3 mb-3 font-weight-normal text-center mb-4">Login</h1>

                        {/* Email */}
                        <input defaultValue={'hasan.webdev1@gmail.com'} type="email" ref={emailRef} className="form-control" placeholder="Enter Email" required />

                        {/* Password */}
                        <div className='mt-3 mb-3'>
                            <input defaultValue={'helloBoi'} type="password" ref={passwordRef} className="form-control" placeholder="Enter Password" required />
                        </div>

                        <div className='mb-3'>
                            <Link class="text-danger" style={{ fontSize: "0.9rem" }} href='/forgot-password'>
                                Forget password?
                            </Link>
                        </div>

                        {/* Submit */}
                        <button className="btn btn-block mt-1 mb-4" style={{ padding: '1.3rem' }} type="submit">
                            Login
                        </button>

                        {/* Create Account */}
                        <div className='text-center'>
                            <small style={{ fontSize: "0.9rem" }}>
                                Don't have account?
                                <Link href='/register' className='text-danger' style={{ paddingLeft: '0.3rem' }}>
                                    Register
                                </Link>
                            </small>
                        </div>
                    </form>
                </div>
            </section>)
    );
};

export default Login;