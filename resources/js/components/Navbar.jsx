import { Link, router } from '@inertiajs/react';

import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';

const Navbar = () => {
    const [categoryList, setCategoryList] = useState([]);
    const searchRef = useRef();

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get('/categoryList');
                setCategoryList(res.data);
            } catch (error) {
                console.error(error);
            }
        })()
    }, [])

    const getCurrentDate = () => {
        const options = {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        };
        return new Intl.DateTimeFormat('en-US', options).format(new Date());
    }

    const handleSearch = () => {
        const query = searchRef.current?.value;
        query && router.visit(`/search?q=${query}`, { method: 'get' });
    }

    const handleLogout = () => {
        try {
            axios.get('/userLogout');
        } catch (e) {

        }
    }

    return (
        <div className="header-area">
            <div className="main-header ">
                <div className="header-mid d-none d-md-block">
                    <div className="container">
                        {/* Logo */}
                        <div className="row d-flex align-items-center">
                            <div className="col-xl-3 col-lg-3 col-md-3">
                                <div className="logo">
                                    <a href="index.html"><img src="/assets/img/logo/logo.png" alt="" /></a>
                                </div>
                            </div>
                            <div className="col-xl-9 col-lg-9 col-md-9">
                                <div className="header-banner f-right ">
                                    <img src="/assets/img/hero/header_card.jpg" alt="" />
                                </div>
                            </div>
                        </div>

                        <div className="d-flex justify-content-between align-items-center pt-3">
                            {/* Current Date */}
                            <div>
                                <small className='font-weight-bold text-secondary'>{getCurrentDate()}</small>
                            </div>

                            <div>
                                {/* Login */}
                                <Link href='/login'>
                                    <button type="button" style={{ transform: 'scale(0.75)', fontSize: "1rem" }} class="btn">Login</button>
                                </Link>

                                {/* Logout */}
                                <button type="button" onClick={handleLogout} style={{ transform: 'scale(0.75)', fontSize: "1rem" }} class="btn">Logout</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="header-bottom header-sticky">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-xl-10 col-lg-10 col-md-12 header-flex">

                                {/* sticky */}
                                <div className="sticky-logo">
                                    <Link href='/'>
                                        <img src="/assets/img/logo/logo.png" alt="" />
                                    </Link>
                                </div>

                                {/*  Main-menu */}
                                <div className="main-menu d-none d-md-block">
                                    <nav>
                                        <ul id="navigation">
                                            {
                                                categoryList.map((categoryName, i) => (

                                                    <li key={i}>
                                                        <Link href={'/collections/' + categoryName}>
                                                            {categoryName}
                                                        </Link>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                            <div className="col-xl-2 col-lg-2 col-md-4">

                                <div className="header-right-btn f-right d-none d-lg-block">
                                    <i onClick={handleSearch} className="fas fa-search special-tag"></i>
                                    <div className="search-box">
                                        <form action="#">
                                            <input ref={searchRef} type="text" placeholder="Search" />
                                        </form>
                                    </div>
                                </div>
                            </div>
                            {/*  Mobile Menu */}
                            <div className="col-12">
                                <div className="mobile_menu d-block d-md-none">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;