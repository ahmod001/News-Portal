import React, { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import TopNews from '../components/Cards/TopNews';
import VerticalNewsCard from '../components/Cards/verticalNewsCard';
import HorizontalNewsCard from '../components/Cards/HorizontalNewsCard';
import axios from 'axios';
import { usePage } from '@inertiajs/react';
import Layout from '../layouts/Layout';

const NewsByCategory = () => {
    const [newsList, setNewsList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { props } = usePage();
    const categoryName = props.params;

    useEffect(() => {
        (async () => {
            setIsLoading(true)
            try {
                const res = await axios.get('/newsListByCategory/' + categoryName);
                setNewsList(res.data?.news);
                setIsLoading(false)
            } catch (error) {
                setIsLoading(false)
                alert('Something went wrong');
            }
        })()
    }, [])


    return (
        <Layout>
            {isLoading ?
                <Loading />
                : <section className='min-vh-100'>
                    <div className="trending-area fix">
                        <div className="container">
                            <div className="trending-main py-5">
                                {/* Category Name */}
                                <h1 className='mb-3 text-danger'>
                                    {categoryName}
                                </h1>
                                <div className="row">
                                    <div className="col-lg-8">
                                        {/* Trending Top */}
                                        <TopNews
                                            id={newsList[0]?.id}
                                            title={newsList[0]?.title}
                                            img={newsList[0]?.img} />

                                        {/* Trending Bottom */}
                                        <div className="trending-bottom">
                                            <div className="row">
                                                {newsList?.map((news, i) => {
                                                    const { id, title, img, description, created_at } = news;

                                                    if (i > 1) {
                                                        return (
                                                            <div key={i} className='col-lg-4'>
                                                                <VerticalNewsCard
                                                                    id={id}
                                                                    img={img}
                                                                    title={title}
                                                                    description={description}
                                                                    created_at={created_at} />
                                                            </div>
                                                        )
                                                    }
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                    {/* Right content */}
                                    <div className="col-lg-4 ">
                                        <HorizontalNewsCard
                                            id={newsList[1]?.id}
                                            img={newsList[1]?.img}
                                            title={newsList[1]?.title}
                                            created_at={newsList[1]?.created_at} />

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>}
        </Layout>
    );
};

export default NewsByCategory;