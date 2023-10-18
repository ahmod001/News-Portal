import { Link } from '@inertiajs/react';
import React from 'react';
import ImgPlaceholder from '../ImgPlaceholder';

const TopNews = ({ id, title, img, }) => {
    const [isImgLoaded, setIsImgLoaded] = React.useState(false);

    return (
        <div className="trending-top mb-30">
            <Link href={`/news/details/${id}`}>
                <div className="trend-top-img">
                    {!isImgLoaded &&
                        (<ImgPlaceholder maxHeight={'35rem'} />)}

                    <img style={{ maxHeight: '35rem' }} onLoad={() => setIsImgLoaded(true)} src={img} alt={title} />

                    <div className="trend-top-cap">
                        <h2 className="text-white">
                            {title}
                        </h2>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default TopNews;