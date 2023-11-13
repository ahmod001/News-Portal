import { usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import Layout from '../layouts/Layout';
import Loading from '../components/Loading';

const SearchResult = () => {
    const [newsList, setNewsList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { params } = usePage().props;

    return (
        <Layout>
            {isLoading ?
                (<Loading />)
                : (<section style={{ height: "100vh" }}>
                    {newsList.length > 0 ?
                        ('')
                        : (<NothingFound />)}
                </section>)}
        </Layout>
    );
};

const NothingFound = () => (
    <div className='h-100 w-100 d-flex justify-content-center align-items-center'>
        <h1>
            Nothing found
        </h1>
    </div>
)

export default SearchResult;