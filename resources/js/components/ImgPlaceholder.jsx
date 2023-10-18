import React from 'react';

const ImgPlaceholder = ({ maxHeight }) => {
    return (
        <img style={{ maxHeight: maxHeight , width:"100%"}} src={'/assets/img/placeholder.png'} alt={'placeholder'} />
    );
};

export default ImgPlaceholder;