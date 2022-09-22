import React, { Component } from "react";
import PropTypes from 'prop-types'
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
export class News extends Component {

    static defaultProps = {
        country: 'in',
        pageSize: '6',
        category: 'general'
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props) {
        /*making of a constructor in class
                                             constructor runs when the object of the class is created*/

        super(props); // always use the " this.super" keyword while creating the constructor

        console.log("cunstructor of component from news component");
        this.state = {
            articles: [], // giving null when no article exist
            loading: true,
            page: 1,
            totalResults: 0
        };
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - LightBringer`;
    }

    //update function to update the article


    async updateNews() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1b3967d3074b43c891d8ab01d6009bfa&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url); // using async function and await

        let parseddata = await data.json();
        this.setState({
            articles: parseddata.articles,
            totalResults: parseddata.totalResults,
            loading: false
        });
    }

    // componentDidMount runs after the return statement that is when component output has
    // been rendered !

    async componentDidMount() {

        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1b3967d3074b43c891d8ab01d6009bfa&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);      // using async function and await
        // fetching data from API using {fetch}

        let parseddata = await data.json();  // parsing data to jason
        this.setState({
            articles: parseddata.articles,
            totalResults: parseddata.totalResults,
            loading: false
        });
        this.updateNews();
    }

    // function to fetch more data for infinte scroll 

    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 })

        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1b3967d3074b43c891d8ab01d6009bfa&page=${this.state.page}&pageSize=${this.props.pageSize}`;

        let data = await fetch(url); // using async function and await

        let parseddata = await data.json();
        this.setState({
            articles: this.state.articles.concat(parseddata.articles),  // adding more articles to the page 
            totalResults: parseddata.totalResults,
            loading: false
        });

    };


    // function to handle previous button
    // handlePreviousClick = async () => {
    //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1b3967d3074b43c891d8ab01d6009bfa&page=${this.state.page - 1
    //         }&pageSize=${this.props.pageSize}`;
    //     this.setState({ loading: true });
    //     let data = await fetch(url); // using async function and await
    //     let parseddata = await data.json();

    //     this.setState({
    //         page: this.state.page - 1,
    //         articles: parseddata.articles,
    //         loading: false
    //     });
    //     // this.setState({ page: this.state.page - 1 });
    //     // this.updateNews();
    // }

    // function to handle next button
    // handleNextClick = async () => {
    //     if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.pageSize))) {
    //         let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1b3967d3074b43c891d8ab01d6009bfa&page=${this.state.page + 1
    //             }&pageSize=${this.props.pageSize}`;
    //         this.setState({ loading: true });
    //         let data = await fetch(url); // using async function and await
    //         let parseddata = await data.json();

    //         this.setState({
    //             page: this.state.page + 1, //setting page state
    //             articles: parseddata.articles, //setting Article state
    //             loading: false

    //         });

    //         // this.setState({ page: this.state.page + 1 });
    //         // this.updateNews();
    //     }
    // }

    render() {
        /*using the bootstrap components and classes making the 
        grid rows and column*/
        return (
            <>
                <h1 className="text-center mt-4 mb-5" >LightBringer-Top {this.capitalizeFirstLetter(this.props.category)} headlines  </h1>
                {this.state.loading && <Spinner />}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={this.state.loading && <Spinner />}
                >
                    <div className="container">
                        <div className="row">

                            {this.state.articles.map((element) => {
                                return (

                                    <div className="col-md-4" key={element.url}>
                                        <NewsItem
                                            title={element.title ? element.title.slice(0, 45) : ""}
                                            description={
                                                element.description ? element.description.slice(0, 88) : ""
                                            }
                                            imageUrl={element.urlToImage}
                                            newsUrl={element.url}
                                            author={element.author}
                                            date={element.publishedAt}
                                            source={element.source.name}

                                        />
                                    </div>

                                ); // slicing the title and description and putting an empty string if the they are null
                                //  using the ternary notation
                            })}
                        </div>
                    </div>
                </InfiniteScroll>


            </ >
        );
    }
}

export default News;
