import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
    static defaultProps ={
        country:'in',
        pageSize: 12
    }

    static propTypes = {
        country: PropTypes.string,
        category: PropTypes.string,
        pageSize: PropTypes.number
    }

    capitalizedFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props){
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page:1,
            totalResults:0
        }
        document.title = `${this.capitalizedFirstLetter(this.props.category)} - News`;
    } 

    async update(){
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?&category=${this.props.category}&country=${this.props.country}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        // this.setState({loading:true});
        let data = await fetch(url);
        this.props.setProgress(40);
        let parsedData = await data.json();
        this.props.setProgress(70);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            // loading:false
        }) 
        this.props.setProgress(100);
    }

    async componentDidMount(){
        this.update();
    }

    //? next/prev buttons
    // previousClick = async () => {
    //     this.setState({page: this.state.page - 1});
    //     this.update();

    // }

    // nextClick = async () => {
    //     this.setState({page: this.state.page + 1});
    //     this.update();
    // }

    fetchMoreData = async () => {
        this.setState({page: this.state.page + 1})
        const url = `https://newsapi.org/v2/top-headlines?&category=${this.props.category}&country=${this.props.country}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults
        }) 
    }

    render() {
        return (
            <>
                <h1 className="heading mx-3 text-center">Top {this.capitalizedFirstLetter(this.props.category)} Headlines</h1> 
                {/* {this.state.loading && <Spinner />} */}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                >
                    <div className="box my-4">
                        <div className="news-items">
                            {/* {!this.state.loading && this.state.articles.map((element)=>{ */}
                            {this.state.articles.map((element)=>{
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
                {/* <div className="container d-flex justify-content-between" >
                    <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.previousClick}><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path d="M12.707 17.293L8.414 13 18 13 18 11 8.414 11 12.707 6.707 11.293 5.293 4.586 12 11.293 18.707z"></path></svg> Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.nextClick}>Next <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path d="M11.293 17.293L12.707 18.707 19.414 12 12.707 5.293 11.293 6.707 15.586 11 6 11 6 13 15.586 13z"></path></svg></button>
                </div> */}
            </>
        );
    }
}

export default News;
