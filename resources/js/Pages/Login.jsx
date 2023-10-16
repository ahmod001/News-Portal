import { Link } from '@inertiajs/react';
import React from 'react';
import { successToast } from '../utils/utils';

const Login = () => {

    function handleLogin(e) {
        e.preventDefault();
    successToast('heiBoi')
    }

    return (
        <section className='container' style={{ paddingTop: '6rem' }}>
            <div className='d-flex justify-content-center'>

                <form style={{ maxWidth: '30rem', width: '100%' }} onSubmit={handleLogin}>

                    {/* Title */}
                    <h1 className="h3 mb-3 font-weight-normal text-center mb-4">Login</h1>

                    {/* Email */}
                    <input type="email" id="inputEmail" className="form-control" placeholder="Enter Email" required />

                    {/* Password */}
                    <div className='mt-3 mb-3'>
                        <input type="password" id="inputPassword" className="form-control" placeholder="Enter Password" required />
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
        </section>
    );
};

export default Login;