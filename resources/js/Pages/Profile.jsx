import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { errorToast, successToast } from '../utils/utils';
import Layout from '../layouts/Layout';
import Loading from '../components/Loading';
import { userContext } from '../Context/UserContext';
import { router } from '@inertiajs/react';

const Profile = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { loginState: [isLoggedIn, setIsLoggedIn] } = useContext(userContext);

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get('userProfile');
            } catch (error) {
                errorToast('Something went wrong')
            }

        })();
    }, [])

    const handleLogout = async () => {
        try {
            const res = await axios.get('/userLogout')
            successToast(res.data.message);
            setIsLoggedIn(false)
            router.visit('/', { method: 'get' })
        } catch (e) {
            errorToast(e.response?.data?.message)
        }
    }

    return (
        isLoading ?
            <Loading />
            : <Layout>
                <section className='d-flex justify-content-center align-items-center' style={{ minHeight: "100vh" }}>
                    <button type="button" onClick={handleLogout} style={{ transform: 'scale(0.75)', fontSize: "1rem" }} class="btn">Logout</button>
                </section>
            </Layout>
    );
};

export default Profile;