import { Link } from '@inertiajs/react';
import React from 'react';

const Footer = () => {
    return (
        <footer>
            <div className="footer-area footer-padding fix">
                <div className="container">
                    <div className="row d-flex justify-content-between">
                        <div className="col-12">
                            <div className="single-footer-caption">
                                <div className="single-footer-caption">
                                    {/* logo */}
                                    <div className="footer-logo">
                                        <Link href="/">
                                            <img src="assets/img/logo/logo2_footer.png" alt="" />
                                        </Link>
                                    </div>
                                    <div className="footer-tittle">
                                        <div className="footer-pera">
                                            <p>Suscipit mauris pede for con sectetuer sodales adipisci for cursus fames lectus tempor da blandit gravida sodales  Suscipit mauris pede for con sectetuer sodales adipisci for cursus fames lectus tempor da blandit gravida sodales  Suscipit mauris pede for sectetuer.</p>
                                        </div>
                                    </div>
                                    {/* social */}
                                    <div className="footer-social">
                                        <a target='_blank' href="#"><i className="fab fa-twitter"></i></a>
                                        <a target='_blank' href="#"><i className="fab fa-instagram"></i></a>
                                        <a target='_blank' href="#"><i className="fab fa-pinterest-p"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- footer-bottom area --> */}
            <div className="footer-bottom-area">
                <div className="container">
                    <div className="footer-border">
                        <div className="row d-flex align-items-center justify-content-between">
                            <div className="col-lg-6">
                                <div className="footer-copy-right">
                                    <p>Developed By <a href="https://github.com/ahmod001" target='_blank'>
                                        Ahmod Hasan
                                    </a></p>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="footer-menu f-right">
                                    <ul>
                                        <li><a href="#">Terms of use</a></li>
                                        <li><a href="#">Privacy Policy</a></li>
                                        <li><a href="#">Contact</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;