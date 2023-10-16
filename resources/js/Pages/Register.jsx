import React from 'react';
import { Link } from '@inertiajs/react';

const Register = () => {
    return (
        <section className='container' style={{ paddingTop: '6rem' }}>
            <div className='d-flex justify-content-center'>

                <form style={{ maxWidth: '30rem', width: '100%' }}>

                    {/* Title */}
                    <h1 className="h3 mb-3 font-weight-normal text-center mb-4">Register</h1>

                    {/* Name */}
                    <div className='mt-3 mb-3'>
                        <input type='text' className="form-control" placeholder="Enter Full Name" required />
                    </div>

                    {/* Email */}
                    <input type="email" id="inputEmail" className="form-control" placeholder="Enter Email" required />

                    {/* Password */}
                    <div className='mt-3 mb-3'>
                        <input type="password" className="form-control" placeholder="Enter Password" required />
                    </div>

                    {/* Confirm Password */}
                    <div className='mt-3 mb-3'>
                        <input type="password" className="form-control" placeholder="Re-enter Password" required />
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