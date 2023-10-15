import React, { useEffect, useState, useRef } from 'react';
import Loading from '../components/Loading';
import axios from 'axios';
import { Link, usePage } from '@inertiajs/react';
import { formatDateString } from '../utils/utils';

const NewsDetails = () => {
    const [news, setNews] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const commentRef = useRef();
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

    const { title, description, img, reporter, category, created_at } = news;

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        const comment  = commentRef.current.value;
    }

    return (
        isLoading ?
            <Loading />
            : <section className="about-area">
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
                                            <li><a href="#"><img src="/assets/img/news/icon-ins.png" alt="" /></a></li>
                                            <li><a href="#"><img src="/assets/img/news/icon-fb.png" alt="" /></a></li>
                                            <li><a href="#"><img src="/assets/img/news/icon-tw.png" alt="" /></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- From --> */}
                            <div className="row">
                                <div className="col-lg-8">
                                    <form onSubmit={() => handleCommentSubmit(event)} className="form-contact contact_form mb-80">
                                        <div className="row">
                                            <div className="col-12">
                                                <div>
                                                    <textarea ref={commentRef} className="form-control w-100 error" rows="8" placeholder="Share Your Thoughts" />
                                                </div>
                                            </div>

                                        </div>
                                        <div className="form-group mt-4">
                                            <button type="submit" className="button button-contactForm boxed-btn">Send</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4"></div>
                    </div>
                </div>
            </section>
    );
};

export default NewsDetails;