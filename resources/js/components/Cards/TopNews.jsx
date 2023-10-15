import { Link } from '@inertiajs/react';
import React from 'react';

const TopNews = ({ id, title, img, }) => {
    return (
        <div className="trending-top mb-30">
            <Link href={`news/details/${id}`}>
                <div className="trend-top-img">
                    <img style={{maxHeight:'35rem'}} src={img} alt={title} />
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