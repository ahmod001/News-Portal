import { Link } from '@inertiajs/react';
import React from 'react';
import { calculateTimeDifference } from '../../utils/utils';
import ImgPlaceholder from '../ImgPlaceholder';

const VerticalNewsCard = ({ id, title, description, img, created_at }) => {
    const [isImgLoaded, setIsImgLoaded] = React.useState(false);

    return (
        <div>
            <Link href={`/news/details/${id}`}>
                <div className="single-bottom mb-35">
                    <div className=" mb-20">

                        {!isImgLoaded &&
                            (<ImgPlaceholder maxHeight={'15rem'} />)}

                        <img style={{ maxHeight: '15rem' }} onLoad={() => setIsImgLoaded(true)} src={img} alt={title} />


                    </div>
                    <div className="trend-bottom-cap">
                        <h4>
                            {title}
                        </h4>

                        <article className='text-dark'>
                            {description?.substring(0, 120)}
                        </article>

                        {/* Time difference */}
                        <small className='text-dark'>{calculateTimeDifference(created_at)}</small>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default VerticalNewsCard;