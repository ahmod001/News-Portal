import { Link } from '@inertiajs/react';
import React from 'react';
import { calculateTimeDifference } from '../../utils/utils';

const HorizontalNewsCard = ({ id, title, description = "", img, created_at }) => {
    return (
        <Link href={`news/details?id=${id}`}>
            <div className="trand-right-single d-flex">
                <div className="trand-right-img">
                    <img style={{ maxHeight: "5.6rem", height: '100%' }} src={img} alt={title} />
                </div>
                <div className="trand-right-cap my-auto">
                    <h4>
                        <a>
                            {title?.substring(0, 50)}
                        </a>
                    </h4>
                    <article className='text-dark'>
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