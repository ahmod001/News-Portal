import React, { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import TopNews from '../components/Cards/TopNews';
import VerticalNewsCard from '../components/Cards/verticalNewsCard';
import HorizontalNewsCard from '../components/Cards/HorizontalNewsCard';
import axios from 'axios';

const NewsByCategory = () => {
    const [newsList, setNewsList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        (async () => {
            setIsLoading(true)
            try {
                const res = await axios.get('/breakingNewsList');
                setNewsList(res.data);
                setIsLoading(false)
            } catch (error) {
                setIsLoading(false)
                alert('Something went wrong');
            }
        })()
    }, [])
    return (
        isLoading ?
            <Loading />
            :<section className='min-vh-100'>
                <div className="trending-area fix">
                    <div className="container">
                        <div className="trending-main py-5">
                            {/* Category Name */}
                            <h1 className='mb-3 text-danger'>
                                Bangladesh
                            </h1>
                            <div className="row">
                                <div className="col-lg-8">
                                    {/* Trending Top */}
                                    <TopNews
                                        id={1}
                                        title={'yo yo'}
                                        img={'/assets/img/trending/trending_top.jpg'} />

                                    {/* Trending Bottom */}
                                    <div className="trending-bottom">
                                        <div className="row">
                                            <div className="col-md-4">
                                                <VerticalNewsCard
                                                    id={1}
                                                    img={"/assets/img/trending/trending_bottom1.jpg"}
                                                    title={' Get the Illusion of Fuller Lashes by “Mascng.'}
                                                    description={'They have donated their lands to the city corporation for the purpose of widening narrow roads and drains in the city. Such '}
                                                    created_at={'2023-10-12 19:49:57'} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Right content */}
                                <div className="col-lg-4 ">
                                    <HorizontalNewsCard
                                        id={1}
                                        img={"/assets/img/trending/trending_bottom1.jpg"}
                                        title={' Get the Illusion of Fuller Lashes by “Mascng.'}
                                        created_at={'2023-10-12 19:49:57'} />

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
    );
};

export default NewsByCategory;