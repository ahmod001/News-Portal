import React from 'react';

const Loading = () => {
    // id="preloader-active"
    return (
        <div >
            <div className="preloader d-flex align-items-center justify-content-center">
                <div className="preloader-inner position-relative">
                    <div className="preloader-circle"></div>
                    <div className="preloader-img pere-text">
                        <img src="/assets/img/logo/logo.png" alt="AZ News" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Loading;