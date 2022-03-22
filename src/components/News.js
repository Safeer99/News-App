import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    
    const capitalizedFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const update = async () => {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?&category=${props.category}&country=${props.country}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        let data = await fetch(url);
        props.setProgress(40);
        let parsedData = await data.json();
        props.setProgress(70);
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false);
        props.setProgress(100);
    }

    useEffect(() => {
        document.title = `${capitalizedFirstLetter(props.category)} - News`;
        update();
    }, [])

    const fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?&category=${props.category}&country=${props.country}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page+1);
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults); 
    }

    return (
        <>
            <h1 className="heading mx-3 text-center">Top {capitalizedFirstLetter(props.category)} Headlines</h1>
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >
                <div className="box my-4">
                    <div className="news-items">
                        {articles.map((element)=>{
                            return <div key={element.url} >
                                <NewsItem   
                                    newsUrl={element.url} 
                                    title={element.title?element.title.slice(0,30):""}
                                    description={element.description?element.description.slice(0,130):""}
                                    date={element.publishedAt?element.publishedAt:"unknown"}
                                    author={element.author?element.author:"unknown"}
                                    name={element.source.name?element.source.name:"unknown"}
                                    imageUrl={element.urlToImage?element.urlToImage:"https://media.istockphoto.com/photos/abstract-digital-news-concept-picture-id1290904409?b=1&k=20&m=1290904409&s=170667a&w=0&h=6khncht98kwYG-l7bdeWfBNs_GGcG1pDqzLb6ZXhh7I="}
                                />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>
        </>
    );
}

News.defaultProps ={
    country:'in',
    pageSize: 12
}

News.propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    pageSize: PropTypes.number
}

export default News;
