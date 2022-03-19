import React, { Component } from 'react'

export class NewsItem extends Component {

    render() {
        let {title,description,imageUrl,newsUrl,date,author,name} = this.props;
        return (
            <div className='news-container'>
                <div className="card mb-3">
                    <div className="source btn-danger">{name}</div>
                    <img src={imageUrl} className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}....</p>
                        <p className="card-text"><small className="text-muted">By {author} on {new Date(date).toGMTString()}</small></p>
                        <a href={newsUrl} target="blank" className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
