import { router } from '@inertiajs/react';
import React from 'react';

const ResetPassword = () => {

    const handleResetPassword = (e) => {
        e.preventDefault();
        return router.visit('/reset-password', { method: 'get' });
    }

    return (
        <section className='container' style={{ paddingTop: '6rem' }}>
            <div className='d-flex justify-content-center'>

                <form onSubmit={() => handleResetPassword(event)} style={{ maxWidth: '30rem', width: '100%' }}>

                    {/* Title */}
                    <h1 className="h3 mb-3 font-weight-normal text-center mb-4">Reset Password</h1>

                    {/* Password */}
                    <div className='mt-3 mb-3'>
                        <input type="password" className="form-control" placeholder="Enter Password" required />
                    </div>

                    {/* Confirm Password */}
                    <div className='mt-3 mb-3'>
                        <input type="password" className="form-control" placeholder="Re-enter Password" required />
                    </div>

                    {/* Submit */}
                    <button className="btn btn-block mt-1 mb-4" style={{ padding: '1.3rem' }} type="submit">
                        Save
                    </button>
                </form>
            </div>
        </section>
    );
};

export default ResetPassword;