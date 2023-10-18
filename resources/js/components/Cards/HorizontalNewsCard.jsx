import { Link } from '@inertiajs/react';
import React from 'react';
import { calculateTimeDifference } from '../../utils/utils';
import ImgPlaceholder from '../ImgPlaceholder';

const HorizontalNewsCard = ({ id, title, description = "", img, created_at }) => {
    const [isImgLoaded, setIsImgLoaded] = React.useState(false);

    return (
        <Link href={`/news/details/${id}`}>
            <div className="trand-right-single d-flex">
                <div className="trand-right-img">

                {!isImgLoaded &&
                            (<ImgPlaceholder maxHeight={"5.6rem"} />)}

                        <img style={{ maxHeight: "5.6rem" }} onLoad={() => setIsImgLoaded(true)} src={img} alt={title} />

                </div>
                <div className="trand-right-cap my-auto">
                    <h4>
                        {title?.substring(0, 50)}
                    </h4>
                    <article className='text-dark '>
                        {description?.substring(0, 120)}
                    </article>

                    {/* Time difference */}
                    <small className='text-dark'>{calculateTimeDifference(created_at)}</small>
                </div>
            </div>
        </Link>
    );
};

export default HorizontalNewsCard;