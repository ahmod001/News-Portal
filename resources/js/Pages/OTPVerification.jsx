import { router } from '@inertiajs/react';
import React from 'react';

const OTPVerification = () => {

    const handleOTPVerification = (e) => {
        e.preventDefault();
        return router.visit('/reset-password',{method:'get'});
    }

    return (
        <section className='container' style={{ paddingTop: '6rem' }}>
            <div className='d-flex justify-content-center'>

                <form onSubmit={() => handleOTPVerification(event)} style={{ maxWidth: '30rem', width: '100%' }}>

                    {/* Title */}
                    <h1 className="h3 mb-3 font-weight-normal text-center mb-4">OTP Verification</h1>

                    {/* Email */}
                    <div className='mt-3 mb-3'>
                        <input defaultValue={'1234'} type="number" className="form-control" placeholder="Enter 4 digit code" required />
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