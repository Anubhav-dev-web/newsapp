import React, { Component } from "react";
import PropTypes from 'prop-types'
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

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
            loading: false,
            page: 1,
        };
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - LightBringer`;
    }
    // async updateNews() {
    //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1b3967d3074b43c891d8ab01d6009bfa&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    //     this.setState({ loading: true });
    //     let data = await fetch(url); // using async function and await

    //     let parseddata = await data.json();
    //     this.setState({
    //         articles: parseddata.articles,
    //         totalResults: parseddata.totalResults,
    //         loading: false
    //     });
    // }

    async componentDidMount() {
        // componentDidMount runs after return statement
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1b3967d3074b43c891d8ab01d6009bfa&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url); // using async function and await

        let parseddata = await data.json();
        this.setState({
            articles: parseddata.articles,
            totalResults: parseddata.totalResults,
            loading: false
        });
        // this.updateNews();
    }

    // function to handle previous button
    handlePreviousClick = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1b3967d3074b43c891d8ab01d6009bfa&page=${this.state.page - 1
            }&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url); // using async function and await
        let parseddata = await data.json();

        this.setState({
            page: this.state.page - 1,
            articles: parseddata.articles,
            loading: false
        });
        // this.setState({ page: this.state.page - 1 });
        // this.updateNews();
    }

    // function to handle next button
    handleNextClick = async () => {
        if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.pageSize))) {
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1b3967d3074b43c891d8ab01d6009bfa&page=${this.state.page + 1
                }&pageSize=${this.props.pageSize}`;
            this.setState({ loading: true });
            let data = await fetch(url); // using async function and await
            let parseddata = await data.json();

            this.setState({
                page: this.state.page + 1, //setting page state
                articles: parseddata.articles, //setting Article state
                loading: false
            });

            // this.setState({ page: this.state.page + 1 });
            // this.updateNews();
        }
    }

    render() {
        /*using the bootstrap components and classes making the 
                                             grid rows and column*/
        return (
            <div className="container  my-5 " >
                <h1 className="text-center mt-4 mb-5" >LightBringer-Top {this.capitalizeFirstLetter(this.props.category)} headlines  </h1>
                {this.state.loading && <Spinner />}
                <div className="row">

                    {!this.state.loading && this.state.articles.map((element) => {
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

                <div className="container d-flex justify-content-between">
                    <button
                        disabled={this.state.page <= 1}
                        type="button"
                        className="btn btn-dark"
                        onClick={this.handlePreviousClick}
                    >{" "}
                        &larr; Previous
                    </button>
                    <button
                        disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.pageSize)}
                        type="button"
                        className="btn btn-dark"
                        onClick={this.handleNextClick}
                    >
                        Next &rarr;
                    </button>
                </div>
            </div >
        );
    }
}

export default News;
