import React, { useEffect, useState, useRef } from 'react';
import Loading from '../components/Loading';
import axios from 'axios';
import { Link, usePage } from '@inertiajs/react';
import { formatDateString } from '../utils/utils';
import Layout from '../layouts/Layout';
import Comments from '../components/Comments/Comments';

const NewsDetails = () => {
    const [news, setNews] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const { props } = usePage();
    const newsId = props.params;


    useEffect(() => {
        (async () => {
            setIsLoading(true)
            try {
                const res = await axios.get('/newsById/' + newsId);
                setNews(res.data);
                setIsLoading(false)
            } catch (error) {
                setIsLoading(false)
                alert('Something went wrong');
            }
        })()
    }, [])

    const { id, title, description, img, reporter, category, created_at } = news;



    const getPageURL = () => (
        window.location.href
    )

    return (
        isLoading ?
            <Loading />
            : <Layout>
                <section className="about-area">
                    <div className="container">

                        <div className="row py-4">
                            <div className="col-lg-8">
                                {/* Category Name */}
                                <Link href={'/collections/' + category?.name} className='text-danger' style={{ fontSize: "1.2rem", textDecoration: 'underline' }}>{category?.name}</Link>

                                {/* Title */}
                                <h2 className="section-tittle mb-30 mt-20">
                                    {title}
                                </h2>

                                {/* Reporter Name */}
                                <h6>{reporter?.name}</h6>

                                {/* Published At */}
                                <div className='mb-30'>
                                    <small className='font-weight-bold text-secondary'>Published: {formatDateString(created_at)}</small>
                                </div>

                                {/* <!-- Img --> */}
                                <div className="about-right mb-90">
                                    <div className="about-img">
                                        <img style={{ maxHeight: '35rem' }} src={img} alt={title} />
                                    </div>

                                    <p className="about-prea1 pt-30">
                                        {description}
                                    </p>

                                    <div className="social-share pt-30">
                                        <div className="section-tittle">
                                            <h3 className="mr-20">Share:</h3>
                                            <ul>
                                                {/* Facebook */}
                                                <li>
                                                    <a target='_blank' href={'https://www.facebook.com/sharer/sharer.php?u=' + getPageURL()}>
                                                        <img src="/assets/img/news/icon-fb.png" alt="facebook" />
                                                    </a>
                                                </li>

                                                {/* Twitter */}
                                                <li>
                                                    <a target='_blank' href={'https://twitter.com/intent/tweet?url=' + getPageURL()}>
                                                        <img src="/assets/img/news/icon-tw.png" alt="twitter" />
                                                    </a>
                                                </li>

                                                {/* Whatsapp */}
                                                <li>
                                                    <a href={'https://api.whatsapp.com/send?text=' + getPageURL()} target='_blank'>
                                                        <img style={{ height: '2.5rem' }} src="/assets/img/news/whatsapp.png" alt="whatsapp" />
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- Comments --> */}
                                <div className="row">
                                    <Comments newsId={id} />
                                </div>
                            </div>
                            <div className="col-lg-4 d-flex justify-content-center">
                                <img src="/assets/img/news/news_card.jpg" style={{ maxHeight: '49rem' }} alt="ad" />
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
    );
};

export default NewsDetails;