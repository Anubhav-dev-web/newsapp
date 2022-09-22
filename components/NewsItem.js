import React, { Component } from 'react'

export class NewsItem extends Component {

    render() {
        let { title, description, imageUrl, newsUrl, author, date, source } = this.props;   //setting the props  and de-refrencing
        return (
            <div className="my-3 container">
                <div className="card" >
                    <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{ left: '90%', zIndex: '1' }}>{source}

                        <span className="visually-hidden">unread messages</span>
                    </span>
                    <img src={!imageUrl ? "https://images.hindustantimes.com/img/2022/08/29/550x309/Breaking_Blog_1661732208997_1661732223386_1661732223386.jpeg" : imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}...  </h5>
                        <p className="card-text">{description}...</p>
                        <p class="card-text"><small className="text-muted">By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</small></p>
                        <a rel="noreferrer" href={newsUrl} taregt="_blank" className="btn btn-sm btn-dark">Read more</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
