import { router } from '@inertiajs/react';
import React, { useRef, useState } from 'react';
import { errorToast, successToast } from '../../utils/utils';
import GoBackButton from '../../components/GoBackButton';
import axios from 'axios';
import Loading from '../../components/Loading';

const ForgotPassword = () => {
    const [isLoading, setIsLoading] = useState(false);
    const emailRef = useRef();

    const handleSendOtp = async (e) => {
        e.preventDefault()
        const email = emailRef.current.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (emailRegex.test(email)) {
            setIsLoading(true);
            try {
                const res = await axios.post('/sendOtp', { email: email });
                setIsLoading(false)
                successToast(res.data.message)
                return router.visit('/verify-otp?email=' + email, { method: 'get' })
            } catch (error) {
                setIsLoading(false)
                errorToast(error.response?.data?.message)
            }
        } else {
            errorToast('Email is invalid')
        }
    }

    return (
        isLoading ?
            <Loading />
            : <section className='container' style={{ paddingTop: '6rem' }}>
                <GoBackButton href={'/login'} />
                <div className='d-flex justify-content-center'>
                    <form onSubmit={() => handleSendOtp(event)} style={{ maxWidth: '30rem', width: '100%' }}>

                        {/* Title */}
                        <h1 className="h3 mb-3 font-weight-normal text-center mb-4">Forgot Password</h1>

                        {/* Email */}
                        <div className='mt-3 mb-3'>
                            <input type="email" ref={emailRef} className="form-control" placeholder="Enter Email" required />
                        </div>

                        {/* Submit */}
                        <button className="btn btn-block mt-1 mb-4" style={{ padding: '1.3rem' }} type="submit">
                            Send OTP
                        </button>
                    </form>
                </div>
            </section>
    );
};

export default ForgotPassword;