import React, { Component } from 'react'

export default class NewsItem extends Component {

  render() {
    let { title, description, imageurl, newsUrl, author, date,source  } = this.props;
    return (
      <>
        <div className="card position-relative" style={{ width: "18rem" }}>
          <span class="position-absolute top-0 end-0  badge rounded-pill bg-danger" style={{transform: "translate(20%, -30%)",zIndex:1}}>
              {source}
              <span className="visually-hidden">unread messages</span>
            </span>
          <img src={imageurl == null ? "https://img.freepik.com/free-vector/global-broadcast-breaking-news-banner-with-global-map_1017-59836.jpg?semt=ais_hybrid&w=740&q=80" : imageurl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-body-secondary">
              By {!author ? "unknown" : author} on {new Date(date).toLocaleString()}
            </small></p>
            <a href={newsUrl}

              target="_blank"
              rel="noreferrer"
              className="btn btn-primary">Read More</a>
          </div>
        </div>
      </>
    )
  }
}

