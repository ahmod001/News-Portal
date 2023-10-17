import { router } from '@inertiajs/react';
import React, { useRef, useState } from 'react';
import { errorToast, successToast } from '../../utils/utils';
import GoBackButton from '../../components/GoBackButton';
import axios from 'axios';
import Loading from '../../components/Loading';

const OTPVerification = () => {
    const [isLoading, setIsLoading] = useState(false);
    const otpRef = useRef();

    const handleOTPVerification = async (e) => {
        e.preventDefault();
        const otp = otpRef.current.value;

        const url = new URL(window.location.href);
        const email = url.searchParams.get('email');

        if (otp.trim().length !== 4) {
            errorToast('OTP Code must be 4 digit')
        } else {
            setIsLoading(true)

            try {
                const res = await axios.post('/verifyOtp', { email: email, otp: otp })
                setIsLoading(false)
                successToast(res.data.message)
                return router.visit('/reset-password', { method: 'get' });
            } catch (error) {
                setIsLoading(false)
                errorToast(error.response?.data.message)
            }
        }

    }

    return (
        <section className='container' style={{ paddingTop: '6rem' }}>
            <GoBackButton href={'/forgot-password'} />

            <div className='d-flex justify-content-center'>
                <form onSubmit={() => handleOTPVerification(event)} style={{ maxWidth: '30rem', width: '100%' }}>

                    {/* Title */}
                    <h1 className="h3 mb-3 font-weight-normal text-center mb-4">OTP Verification</h1>

                    {/* Email */}
                    <div className='mt-3 mb-3'>
                        <input ref={otpRef} type="number" className="form-control" placeholder="Enter 4 digit code" required />
                    </div>

                    {/* Submit */}
                    <button className="btn btn-block mt-1 mb-4" style={{ padding: '1.3rem' }} type="submit">
                        Verify
                    </button>
                </form>
            </div>
        </section>
    );
};

export default OTPVerification;