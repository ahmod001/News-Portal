import { router } from '@inertiajs/react';
import React from 'react';

const ForgotPassword = () => {

    const handleSendOtp = (e) => {
        e.preventDefault()
        return router.visit('/verify-otp', { method: 'get' })
    }

    return (
        <section className='container' style={{ paddingTop: '6rem' }}>
            <div className='d-flex justify-content-center'>

                <form onSubmit={() => handleSendOtp(event)} style={{ maxWidth: '30rem', width: '100%' }}>

                    {/* Title */}
                    <h1 className="h3 mb-3 font-weight-normal text-center mb-4">Forgot Password</h1>

                    {/* Email */}
                    <div className='mt-3 mb-3'>
                        <input defaultValue={'hasan.webdev1@gmail.com'} type="email" id="inputEmail" className="form-control" placeholder="Enter Email" required />
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