import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {

  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general"
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
  constructor(props) {
    super(props);
    console.log("Inside constructor from news component");
    this.state = {
      // articles: this.articles,
      articles: [],
      loading: false,
      page: 1
    };
    document.title = `${this.capitalizeFirstLetter(this.props.category)}-NewsApp`;
  }

  async updateNews() {
    this.props.setProgress(0);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.props.setProgress(20);
    this.setState({ loading: true })
    let data = await fetch(url);
    let parsedData = await data.json();
    this.props.setProgress(60);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    })
    this.props.setProgress(100);
  }

  async componentDidMount() {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=aed1d7b35e6c4d238a865afb1e87dd7a&page=1&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true })
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // this.setState({
    //   articles: parsedData.articles,
    //   totalResults: parsedData.totalResults,
    //   loading: false
    // })
    this.updateNews();

  }
  handlePreviousClick = async () => {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=aed1d7b35e6c4d238a865afb1e87dd7a&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    // this.setState({loading:true})
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // console.log(parsedData);
    // this.setState({ articles: parsedData.articles })

    // this.setState({
    //   page: this.state.page - 1,
    //   loading:false
    // });
    await this.setState(
      { page: this.state.page - 1 }
    )
    this.updateNews();
  }

  handleNextClick = async () => {

    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=aed1d7b35e6c4d238a865afb1e87dd7a&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    // this.setState({loading:true})
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // console.log(parsedData);
    // this.setState({ articles: parsedData.articles })

    // this.setState({
    //   page: this.state.page + 1,
    //   totalResults:parsedData.totalResults,
    //   loading:false
    // });
    await this.setState(
      { page: this.state.page + 1 }
    )
    this.updateNews();
  }

  fetchMoreData = async () => {
    //this.setState({ page: this.state.page + 1 });
    const nextPage = this.state.page + 1;
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}&page=${nextPage}&pageSize=${this.props.pageSize}`;
    //this.setState({ loading: true })
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      page: nextPage,
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false
    })
  };

  render() {
    
    return (
      <div className="container my-4">
        <h2 className="text-center" style={{ margin: "35px 0px",marginTop:"80px" }}>NewsApp-- Top {this.capitalizeFirstLetter(this.props.category)} headlines</h2>
        {/* {this.state.loading && <Spinner />} */}



        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles !== this.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {/* {!this.state.loading && this.state.articles.map((element) => { */}
              {this.state.articles.map((element) => {
                return (
                  <div className="col-md-3" key={element.url}>
                    <NewsItem
                      title={element.title ? element.title.slice(0, 40) : ""} description={element.description ? element.description.slice(0, 80) : ""}
                      imageurl={element.urlToImage} newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>

                )
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div class="d-flex justify-content-between my-4">
          <button disabled={this.state.page <= 1} type="button" class="btn btn-secondary" onClick={this.handlePreviousClick}>&larr; Previous</button>
          <button disabled={this.state.page >= Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" class="btn btn-secondary" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}

      </div>
    );
  }
}
export default News;