import React, { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import TopNews from '../components/Cards/TopNews';
import VerticalNewsCard from '../components/Cards/verticalNewsCard';
import axios from 'axios';
import Layout from '../layouts/Layout';


const Home = () => {
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
    }, []);

    return (
        <Layout>
            {isLoading ?
                <Loading />
                : <section className='min-vh-100'>
                    <div className="trending-area fix">
                        <div className="container">
                            <div className="trending-main py-5">
                                <div className="row">
                                    <div className="col-lg-8">
                                        {/* Trending Top */}
                                        <TopNews
                                            id={newsList[0]?.news_id}
                                            title={newsList[0]?.news?.title}
                                            img={newsList[0]?.news?.img} />

                                        {/* Trending Bottom */}
                                        <div className="trending-bottom">
                                            <div className="row">
                                                {newsList?.map((news, i) => {
                                                    const { news_id,
                                                        news: { title, img, description, created_at } } = news;

                                                    if (i > 1) {
                                                        return (
                                                            <div key={news_id} className='col-lg-4'>
                                                                <VerticalNewsCard
                                                                    id={news_id}
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
                                    <div className="col-lg-4 row trending-bottom">
                                        <div className='col-lg-9'>
                                            <VerticalNewsCard
                                                id={newsList[1]?.news_id}
                                                img={newsList[1]?.news?.img}
                                                title={newsList[1]?.news?.title}
                                                description={newsList[1]?.news?.description}
                                                created_at={newsList[1]?.news?.created_at} />
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>}
        </Layout>
    );
};

export default Home;