import { usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import Layout from '../layouts/Layout';
import Loading from '../components/Loading';
import axios from 'axios';
import VerticalNewsCard from '../components/Cards/verticalNewsCard';

const SearchResult = () => {
    const [newsList, setNewsList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { params } = usePage().props;

    useEffect(() => {
        (async () => {
            setIsLoading(true)
            try {
                const res = await axios.get('/newsListByTitle/' + params);
                setIsLoading(false)
                setNewsList(res.data)
            } catch (error) {
                setIsLoading(false)
            }
        })();
    }, [])
    return (
        <Layout>
            {isLoading ?
                (<Loading />)
                : (<section className='container py-5 mx-auto' style={{ minHeight: "100vh" }}>
                    {newsList.length > 0 ?
                        (<div>
                            <div className='row'>
                                {newsList.map((news) => {
                                    const { id, title, img, description, created_at } = news;

                                    return (
                                        <div key={id} className='col-lg-4'>
                                            <VerticalNewsCard
                                                id={id}
                                                img={img}
                                                title={title}
                                                description={description}
                                                created_at={created_at} />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>)
                        : (<NothingFound />)}

                </section>)}
        </Layout>
    );
};

const NothingFound = () => (
    <div className='h-100 w-100 d-flex justify-content-center align-items-center'>
        <h1 style={{ fontSize: "2.2rem" }}>
            Nothing found
        </h1>
    </div>
)

export default SearchResult;